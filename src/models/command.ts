import type { AutocompleteInteraction, CommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

import type { SupportedLocales } from '#utils/common';

export interface Context {
  locale: SupportedLocales;
}

export abstract class Command {
  public readonly data: RESTPostAPIApplicationCommandsJSONBody;

  constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
    this.data = data;
  }

  abstract execute(interaction: CommandInteraction, context: Context): Promise<void>;

  autocomplete?(interaction: AutocompleteInteraction, context: Context): Promise<void>;
}
