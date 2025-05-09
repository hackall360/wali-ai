import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  EmbedBuilder,
  hyperlink,
  unorderedList,
  type APIEmbedField
} from 'discord.js';

import { config } from '#config';
import { Command } from '#models/command';
import { type ContractModel } from '#types/database';
import { api } from '#utils/api';
import { DATABASE_URL, truncateArray } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'contract',
      description: 'Returns the details of the specified contract',
      options: [
        {
          name: 'name',
          description: 'Name of the contract',
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

    const data = await api.get<ContractModel>(name);

    if (!data) {
      interaction.reply(`The contract "${name}" could not be found.`);
      return;
    }

    const components = new ActionRowBuilder<ButtonBuilder>();

    const embed = new EmbedBuilder();

    embed.setColor(0xf3deb5);

    if (data.name) {
      embed.setTitle(data.name);
      embed.setURL(`${DATABASE_URL}/contracts/${data.id}`);
      if (data.conditions?.some((condition) => condition.locations)) {
        components.addComponents(
          new ButtonBuilder({
            label: 'View locations',
            style: ButtonStyle.Link,
            url: `${DATABASE_URL}/contracts/${data.id}`,
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

    if (data.conditions?.length) {
      fields.push({
        name: 'Conditions',
        // TODO: Verify if this is correct
        value: unorderedList(data.conditions.map((condition) => {
          if (condition.name) {
            if (condition.number) {
              return condition.name.replace("{number}", condition.number.toString());
            }
            if (condition.name) {
              return condition.name;
            }
          }
          return "Unknown";
        }))
      });
    }

    if (data.chainName && data.chainContracts?.length) {
      fields.push({
        name: data.chainName,
        value: unorderedList(truncateArray(data.chainContracts.map((contract) => hyperlink(contract.name ?? 'Unknown', `${DATABASE_URL}/contracts/${contract.id}`)), 5))
      });
    }

    embed.addFields(fields)

    await interaction.editReply({
      embeds: [embed],
      components: components.components.length ? [components] : []
    });
  }

  override async autocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const value = interaction.options.getFocused();

    // TODO: Add type checking
    let data = await api.search(value, ["Contracts"])

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
