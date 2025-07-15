import {
  ApplicationCommandOptionType,
  ChannelType,
  CommandInteraction,
  InteractionContextType,
  MessageFlags,
  PermissionFlagsBits
} from 'discord.js';
import { eq } from 'drizzle-orm';

import { database } from '#database';
import { guilds, webhookChannels } from '#database/schema';
import { Command } from '#models/command';
import { SUPPORTED_LOCALES_NAMES, type SupportedLocales } from '#utils/common';
import { logger } from '#utils/logger';

export default new (class extends Command {
  constructor() {
    super({
      name: 'settings',
      description: 'Configure the bot settings',
      default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
      contexts: [InteractionContextType.Guild],
      options: [
        {
          name: 'locale',
          description: 'Set the bot locale',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'value',
              description: 'The locale to set',
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: Object.entries(SUPPORTED_LOCALES_NAMES).map(([locale, name]) => ({
                name,
                value: locale,
              })),
            },
          ],
        },
        {
          name: 'service',
          description: 'Configure service webhooks',
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: 'type',
              description: 'The service type to configure',
              type: ApplicationCommandOptionType.String,
              required: true,
              choices: [
                {
                  name: 'Deep Desert',
                  value: 'DEEP_DESERT',
                },
              ],
            },
            {
              name: 'channel',
              description: 'The channel to create the webhook in',
              type: ApplicationCommandOptionType.Channel,
              required: true,
              channel_types: [
                ChannelType.GuildText,
                ChannelType.GuildAnnouncement,
                ChannelType.GuildForum,
              ],
            },
          ],
        },
      ],

    });
  }

  override async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand() || !interaction.inGuild()) return;

    if (!interaction.deferred) await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const options = interaction.options;

    const group = options.getSubcommandGroup();
    const subcommand = options.getSubcommand();

    switch (subcommand) {
      case 'locale': {
        let locale = options.getString('value') as SupportedLocales;

        try {
          await database.update(guilds).set({ locale }).where(eq(guilds.id, interaction.guildId));
        } catch (error) {
          logger.error(`Error while updating locale for guild ${interaction.guild?.id}: ${error}`);
          await interaction.editReply({
            content: 'An error occurred while updating the locale.',
          });
          return;
        }

        await interaction.editReply({
          content: `Locale has been set to ${SUPPORTED_LOCALES_NAMES[locale]}.`,
        });
        break;
      }

      case 'service': {
        const serviceType = options.getString('type') as 'DEEP_DESERT';
        const channel = options.getChannel('channel', true);

        if (!('createWebhook' in channel)) {
          await interaction.editReply({
            content: 'This channel type does not support webhooks.',
          });
          return;
        }

        const permissions = channel.permissionsFor(interaction.guild!.members.me!);
        if (!permissions?.has(PermissionFlagsBits.ManageWebhooks)) {
          await interaction.editReply({
            content: 'I need the "Manage Webhooks" permission in that channel to create a webhook.',
          });
          return;
        }

        try {
          const existingWebhook = await database.query.webhookChannels.findFirst({
            where: (webhookChannels, { and, eq }) => and(eq(webhookChannels.channelId, channel.id), eq(webhookChannels.webhookType, serviceType))
          });

          if (existingWebhook) {
            await interaction.editReply({
              content: `A webhook for ${serviceType.replace('_', ' ')} already exists in ${channel}.`,
            });
            return;
          }

          const webhook = await channel.createWebhook({
            name: interaction.client.user.username,
            avatar: interaction.client.user.avatarURL(),
            reason: `Created by ${interaction.user.username} for ${serviceType.replace('_', ' ')} service`,
          });

          await database.insert(webhookChannels).values({
            id: `${interaction.guildId}-${channel.id}-${serviceType}`,
            guildId: interaction.guildId,
            channelId: channel.id,
            webhookId: webhook.id,
            webhookToken: webhook.token,
            webhookType: serviceType,
          });

          await interaction.editReply({
            content: `Successfully created webhook for ${serviceType.replace('_', ' ')} in ${channel}.`,
          });
        } catch (error) {
          logger.error(`Error while creating webhook for guild ${interaction.guild?.id}: ${error}`);
          await interaction.editReply({
            content: 'An error occurred while creating the webhook.',
          });
        }
        break;
      }

      default:
        await interaction.editReply({
          content: 'Unknown subcommand.',
        });
    }
  }
})();
