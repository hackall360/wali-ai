import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SKUFlags,
  unorderedList,
  userMention,
  type APIEmbedField,
  type APIEntitlement,
  type APISKU
} from 'discord.js';

import { config } from '#config';
import { Command } from '#models/command';
import { Embed } from '#models/embed';

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

    let response = await fetch(`https://entitlements.glazk0.dev/applications/${interaction.client.application.id}/entitlements`, {
      headers: {
        'Authorization': config.entitlementsSecretToken,
      },
    });

    const entitlements = await response.json() as APIEntitlement[];

    response = await fetch(`https://entitlements.glazk0.dev/applications/${interaction.client.application.id}/skus`, {
      headers: {
        'Authorization': config.entitlementsSecretToken,
      },
    });

    const skus = await response.json() as APISKU[];

    const embed = new Embed();

    embed.setTitle('Supporters');

    embed.setThumbnail(interaction.client.user.displayAvatarURL());

    embed.setDescription('This bot is made possible by the support of our community. If you would like to support the development of this bot, consider subscribing to one of the available tiers below.',);

    const fields: APIEmbedField[] = [];

    if (entitlements.length) {
      const users = entitlements.filter(entitlement => entitlement.user_id).map(entitlement => userMention(entitlement.user_id as string))
      fields.push({
        name: 'Thanks to our supporters',
        value: unorderedList(users),
      });
    }

    embed.addFields(fields);

    const actionRow = new ActionRowBuilder<ButtonBuilder>();

    for (const sku of skus.filter(sku => sku.flags === (SKUFlags.UserSubscription | SKUFlags.Available))) {
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
