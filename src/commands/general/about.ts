import {
  type APIEmbedField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  hyperlink,
  unorderedList,
  userMention,
} from 'discord.js';

import { Command } from '#models/command';
import { BOT_PERMISSIONS, DATABASE_URL, DEVELOPERS, KO_FI_URL } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'about',
      description: 'Returns bot informations',
    });
  }

  override async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();

    const embed = new EmbedBuilder();

    embed.setTitle('About');

    embed.setDescription(
      `${interaction.client.user.username} is a Discord bot created by ${DEVELOPERS.map(userMention).join(', ')} that is designed to get the informations of the ${hyperlink('Dune Awakening database', DATABASE_URL)} and display them in a user-friendly way.`
    );

    embed.setThumbnail(interaction.client.user.displayAvatarURL());

    const fields: APIEmbedField[] = [];

    const shardInfo = interaction.client.shard
      ? [
        interaction.client.shard.count ? `Shards: ${interaction.client.shard.count}` : '',
        interaction.client.shard.ids.length ? `Shard: #${interaction.client.shard.ids[0]}` : '',
      ].filter(Boolean)
      : [];

    fields.push({
      name: 'Informations',
      value: unorderedList([
        `Developer: ${DEVELOPERS.map(userMention).join(', ')}`,
        `Servers: ${interaction.client.guilds.cache.size}`,
        `Users: ${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`,
        ...shardInfo,
      ]),
    });

    embed.addFields(fields);

    embed.setFooter({
      text: interaction.client.user.username,
      iconURL: interaction.client.user.displayAvatarURL(),
    });

    embed.setTimestamp();

    const components = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          label: 'Invite me',
          style: ButtonStyle.Link,
          url: interaction.client.generateInvite(BOT_PERMISSIONS),
        }),
        new ButtonBuilder({
          label: 'Support the developer',
          style: ButtonStyle.Link,
          url: KO_FI_URL,
        }),
      ],
    });

    await interaction.editReply({
      embeds: [embed],
      components: [components],
    });
  }
})();
