import {
  type APIEmbedField,
  ActionRowBuilder,
  ApplicationCommandOptionType,
  AttachmentBuilder,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  hyperlink,
  unorderedList,
} from 'discord.js';

import { Command, type Context } from '#models/command';
import { Embed } from '#models/embed';
import { type ItemModel } from '#types/database';
import { api } from '#utils/api';
import { createColorPaletteImage } from '#utils/canvas';
import { DATABASE_URL, PROXY_URL, truncateArray } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'item',
      description: 'Returns the details of the specified item',
      options: [
        {
          name: 'name',
          description: 'Name of the item',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  override async execute(interaction: CommandInteraction, context: Context): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.deferred) await interaction.deferReply();

    const name = interaction.options.getString('name', true);

    const data = await api.get<ItemModel>(name, context.locale);

    if (!data) {
      interaction.reply(`The item "${name}" could not be found.`);
      return;
    }

    const actionRow = new ActionRowBuilder<ButtonBuilder>();

    const embed = new Embed();

    if (data.name) {
      embed.setTitle(data.name);
      embed.setURL(`${DATABASE_URL}/items/${data.id}`);
    }

    if (data.description) {
      embed.setDescription(data.description);
    }

    if (data.iconPath) {
      embed.setThumbnail(PROXY_URL + data.iconPath);
    }

    if (data.dropLocations?.length) {
      actionRow.addComponents(
        new ButtonBuilder({
          label: 'View locations',
          style: ButtonStyle.Link,
          url: `${DATABASE_URL}/items/${data.id}`,
        })
      );
    }

    const fields: APIEmbedField[] = [];

    // TODO: Add stats & other data

    if (data.requiredForContract?.length) {
      const contracts = data.requiredForContract.map((contract) => {
        if (!contract?.name) return 'Unknown';
        return hyperlink(contract.name ?? 'Unknown', `${DATABASE_URL}/contracts/${contract.id}`);
      });

      fields.push({
        name: 'Related Contracts',
        value: unorderedList(truncateArray(contracts, 5)),
      });
    }

    if (data.soldBy?.length) {
      const vendors = data.soldBy.map((vendor) => {
        if (!vendor?.entity) return 'Unknown';
        return hyperlink(vendor.entity.name ?? 'Unknown', `${DATABASE_URL}/npcs/${vendor.entity.id}`);
      });
      fields.push({
        name: 'Sold By',
        value: unorderedList(truncateArray(vendors, 5)),
      });
    }

    let file: AttachmentBuilder | null = null;

    if (data.customization?.swatchColors?.length) {
      const image = createColorPaletteImage(data.customization.swatchColors);

      file = new AttachmentBuilder(image, { name: 'colors.png' });

      embed.setImage('attachment://colors.png');
    }

    embed.addFields(fields);

    await interaction.editReply({
      embeds: [embed],
      components: actionRow.components.length ? [actionRow] : [],
      files: file ? [file] : [],
    });
  }

  override async autocomplete(interaction: AutocompleteInteraction, context: Context): Promise<void> {
    const value = interaction.options.getFocused();

    // TODO: Add type checking
    let data = await api.search(context.locale, value, [
      'Items',
      'Misc',
      'Weapons',
      'Utilty',
      'Vehicles',
      'Garment',
      'Contract',
      'Customization',
    ]);

    data = data.slice(0, 25);

    await interaction.respond(
      data
        .filter((entry) => entry.name !== undefined && entry.path !== undefined)
        .map((entry) => ({
          name: entry.name as string,
          value: entry.path as string,
        }))
    );
  }
})();
