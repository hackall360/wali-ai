import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SKUFlags,
  unorderedList,
  userMention,
  type APIEmbedField
} from 'discord.js';

import { Command } from '#models/command';
import { Embed } from '#models/embed';
import { KO_FI_URL } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'supporters',
      description: 'Returns a list of supporters, contributors, and patrons',
    });
  }

  override async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.deferred) await interaction.deferReply();

    const entitlements = interaction.entitlements ?? [];
    let skus = await interaction.client.application.fetchSKUs();
    skus = skus.filter(sku => sku.flags.has(SKUFlags.UserSubscription) && sku.flags.has(SKUFlags.Available));

    const embed = new Embed();

    embed.setTitle('Supporters');

    embed.setThumbnail(interaction.client.user.displayAvatarURL());

    embed.setDescription('This bot is made possible by the support of our community. If you would like to support the development of this bot, consider subscribing to one of the available tiers below.',);

    const fields: APIEmbedField[] = [];

    if (entitlements.size) {
      const users = entitlements.filter(entitlement => entitlement.userId).map(entitlement => userMention(entitlement.userId))
      fields.push({
        name: 'Thanks to our supporters',
        value: unorderedList(users),
      });
    }

    embed.addFields(fields);

    const actionRow = new ActionRowBuilder<ButtonBuilder>();

    const supportButton = new ButtonBuilder()
      .setLabel('One-time support')
      .setStyle(ButtonStyle.Link)
      .setURL(KO_FI_URL);

    actionRow.addComponents(supportButton);

    for (const [_, sku] of skus) {
      const button = new ButtonBuilder()
        .setStyle(ButtonStyle.Premium)
        .setSKUId(sku.id);
      actionRow.addComponents(button);
    }

    await interaction.editReply({
      embeds: [embed],
      components: actionRow.components.length ? [actionRow] : [],
    });
  }
})();
