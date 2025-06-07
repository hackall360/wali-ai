import { ApplicationCommandOptionType, AutocompleteInteraction, CommandInteraction } from 'discord.js';

import { commands } from '#commands';
import { Command, type Context } from '#models/command';
import { api } from '#utils/api';

export default new (class extends Command {
  constructor() {
    super({
      name: 'search',
      description: 'Searches for an item, contract, or other entity',
      options: [
        {
          name: 'name',
          description: 'Name of the item, contract, or other entity to search for',
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

    const [category, id] = name.split('/');

    if (!category || !id) {
      await interaction.editReply(
        'It seems like the name you provided is not in the correct format. Please retry or contact the bot owner if you think this is a bug.'
      );
      return;
    }

    const singularCategory = category.endsWith('s') ? category.slice(0, -1) : category;

    const command = commands.get(singularCategory);

    if (!command) {
      await interaction.editReply(`The category "${category}" is not recognized. Please check the name and try again.`);
      return;
    }

    await command.execute(interaction, context);
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
      'NPCs',
      'Skills',
      'Contracts',
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
