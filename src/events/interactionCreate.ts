import { EmbedBuilder, Events, hyperlink, type Interaction, type InteractionReplyOptions, MessageFlags, MessagePayload } from 'discord.js';

import { commands } from '#commands';
import { Event } from '#models/event';
import { contributors } from '#utils/cache';
import { KO_FI_URL } from '#utils/common';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onInteractionCreate', Events.InteractionCreate);
  }

  async listener(interaction: Interaction): Promise<void> {
    if (interaction.isAutocomplete()) {
      const command = commands.get(interaction.commandName);

      if (!command?.autocomplete) return;

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        logger.error(error);
      }

      return;
    }

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    logger.info(`Command interaction received: ${interaction.commandName}`);

    try {
      await command.execute(interaction);

      if (!contributors.has(interaction.user.id)) {
        contributors.set(interaction.user.id, new Date());

        const embed = new EmbedBuilder()
          .setTitle(`Hey ${interaction.user.username}, thanks for using ${interaction.client.user.username}!`)
          .setDescription(
            `I hope you're enjoying the bot! If you find it helpful, please consider ${hyperlink('supporting the developer', KO_FI_URL)} to help him maintain and improve it further. Your support is greatly appreciated!`
          )
          .setColor(Math.floor(Math.random() * 16777215))
          .setURL(KO_FI_URL);

        await interaction.followUp({ embeds: [embed], ephemeral: true });
      }
    } catch (_error) {
      const error = _error as Error;

      logger.error(error.message);
      logger.error(error.stack);

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
