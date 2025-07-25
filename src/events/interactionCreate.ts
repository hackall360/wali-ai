import {
  ActionRowBuilder,
  type APIEntitlement,
  type APISKU,
  bold,
  ButtonBuilder,
  ButtonStyle,
  Events,
  type Interaction,
  type InteractionReplyOptions,
  MessageFlags,
  MessagePayload,
  SKUFlags
} from 'discord.js';
import { eq } from 'drizzle-orm';

import { commands } from '#commands';
import { config } from '#config';
import { database } from '#database';
import { guilds } from '#database/schema';
import type { Context } from '#models/command';
import { Embed } from '#models/embed';
import { Event } from '#models/event';
import { contributors } from '#utils/cache';
import { isSupportedLocale, type SupportedLocales } from '#utils/common';
import { logger } from '#utils/logger';
import { commandCounter, commandFailureCounter, commandSuccessCounter } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onInteractionCreate', Events.InteractionCreate);
  }

  async listener(interaction: Interaction): Promise<void> {
    const context: Context = {
      locale: isSupportedLocale(interaction.locale) ? interaction.locale : 'en' as const,
    };

    if (interaction.inGuild()) {
      let guild = await database.query.guilds.findFirst({
        where: eq(guilds.id, interaction.guildId)
      });
      if (!guild) {
        [guild] = await database
          .insert(guilds)
          .values({ id: interaction.guildId })
          .onConflictDoNothing({ target: guilds.id })
          .returning();
      }
      if (guild?.locale) {
        context.locale = guild.locale as SupportedLocales;
      }
    }

    if (interaction.isAutocomplete()) {
      const command = commands.get(interaction.commandName);

      if (!command?.autocomplete) return;

      try {
        await command.autocomplete(interaction, context);
      } catch (error) {
        logger.error(error);
      }

      return;
    }

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    commandCounter.inc({
      commandType: interaction.commandType,
      type: interaction.type,
      commandName: interaction.commandName,
    });

    logger.info(`Command interaction received: ${interaction.commandName}`);

    try {
      await command.execute(interaction, context);

      // const response = await fetch(`https://entitlements.glazk0.dev/applications/${interaction.client.application.id}/entitlements`, {
      //   headers: {
      //     'Authorization': config.entitlementsSecretToken,
      //   },
      // });

      // const entitlements = await response.json() as APIEntitlement[];

      // const isContributor = entitlements.some((entitlement) => entitlement.user_id === interaction.user.id);

      // if (interaction.commandName !== 'supporters' && !contributors.has(interaction.user.id) && !isContributor) {
      //   const response = await fetch(`https://entitlements.glazk0.dev/applications/${interaction.client.application.id}/skus`, {
      //     headers: {
      //       'Authorization': config.entitlementsSecretToken,
      //     },
      //   });

      //   const skus = await response.json() as APISKU[];

      //   contributors.set(interaction.user.id, new Date());

        const embed = new Embed()
          .setTitle(`Hey ${interaction.user.username}, thanks for using ${interaction.client.user.username}!`)
          .setDescription(`I hope you're enjoying the bot! If you find it helpful, please consider ${bold('supporting the developer')} to help him maintain and improve it further. Your support is greatly appreciated!`)
          .setColor(Math.floor(Math.random() * 16777215));

      //   const actionRow = new ActionRowBuilder<ButtonBuilder>();

      //   for (const sku of skus.filter(sku => sku.flags === (SKUFlags.UserSubscription | SKUFlags.Available))) {
      //     const button = new ButtonBuilder()
      //       .setStyle(ButtonStyle.Premium)
      //       .setSKUId(sku.id);
      //     actionRow.addComponents(button);
      //   }

        await interaction.followUp({
          embeds: [embed],
          // components: actionRow.components.length ? [actionRow] : [],
          flags: MessageFlags.Ephemeral,
        });
      // }

      commandSuccessCounter.inc({
        commandType: interaction.commandType,
        type: interaction.type,
        commandName: interaction.commandName,
      });
    } catch (_error) {
      const error = _error as Error;

      logger.error(error.message);
      logger.error(error.stack);

      commandFailureCounter.inc({
        commandType: interaction.commandType,
        type: interaction.type,
        commandName: interaction.commandName,
      });

      try {
        if (interaction.isAutocomplete()) {
          return;
        }

        const reply: string | MessagePayload | InteractionReplyOptions = {
          content: 'There was an error while executing this command. Please try again later.',
          flags: MessageFlags.Ephemeral,
          embeds: [],
          components: [],
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(reply);
        } else {
          await interaction.reply(reply);
        }
      } catch (__error) {
        const subError = __error as Error;

        logger.error(subError.message);
        logger.error(subError.stack);
      }
    }
  }
})();
