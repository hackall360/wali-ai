import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  hyperlink,
  unorderedList,
  type APIEmbedField
} from 'discord.js';

import { config } from '#config';
import { Command } from '#models/command';
import { Embed } from '#models/embed';
import { type NpcModel } from '#types/database';
import { api } from '#utils/api';
import { DATABASE_URL, truncateArray } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'npc',
      description: 'Returns the details of the specified npc',
      options: [
        {
          name: 'name',
          description: 'Name of the npc',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true
        }
      ]
    });
  }

  override async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();

    const name = interaction.options.getString('name', true);

    const data = await api.get<NpcModel>(name);

    if (!data) {
      interaction.reply(`The npc "${name}" could not be found.`);
      return;
    }

    const actionRow = new ActionRowBuilder<ButtonBuilder>();

    const embed = new Embed();

    if (data.name) {
      embed.setTitle(data.name);
      embed.setURL(`${DATABASE_URL}/npcs/${data.id}`);
      if (data.locations?.length) {
        actionRow.addComponents(
          new ButtonBuilder({
            label: 'View locations',
            style: ButtonStyle.Link,
            url: `${DATABASE_URL}/npcs/${data.id}`,
          }),
        );
      }
    }

    if (data.description) {
      embed.setDescription(data.description);
    }

    if (data.iconPath) {
      embed.setThumbnail(`${config.cdnUrl}${data.iconPath.replace('{height}', '256')}`);
    }

    const fields: APIEmbedField[] = [];

    if (data.contracts?.length) {
      const contracts = data.contracts.map((contract) => {
        if (!contract?.name) return 'Unknown';
        return hyperlink(contract.name ?? 'Unknown', `${DATABASE_URL}/contracts/${contract.id}`)
      });

      fields.push({
        name: 'Related Contracts',
        value: unorderedList(truncateArray(contracts, 5)),
      });
    }

    embed.addFields(fields)

    await interaction.editReply({
      embeds: [embed],
      components: actionRow.components.length ? [actionRow] : []
    });
  }

  override async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const value = interaction.options.getFocused();

    // TODO: Add type checking
    let data = await api.search(value, ["NPCs"])

    data = data.slice(0, 25);

    await interaction.respond(
      data
        .filter((entry) => entry.name !== undefined && entry.path !== undefined)
        .map((entry) => ({
          name: entry.name as string,
          value: entry.path as string
        }))
    );
  }
})();
