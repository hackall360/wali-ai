import type { AutocompleteInteraction, CommandInteraction, RESTPostAPIApplicationCommandsJSONBody } from 'discord.js';

export abstract class Command {
  public readonly data: RESTPostAPIApplicationCommandsJSONBody;

  constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
    this.data = data;
  }

  abstract execute(interaction: CommandInteraction): Promise<void>;

  autocomplete?(interaction: AutocompleteInteraction): Promise<void>;
}
