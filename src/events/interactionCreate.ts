import { Events, type Interaction, type InteractionReplyOptions, MessageFlags, MessagePayload } from 'discord.js';

import { commands } from '#commands';
import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onInteractionCreate', Events.InteractionCreate);
  }

  async listener(interaction: Interaction): Promise<void> {
    if (interaction.isAutocomplete()) {
      const command = commands.get(interaction.commandName);

      if (!command?.autocomplete) return;

      try {
        await command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }

      return;
    }

    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) return;

    logger.info(`Command interaction received: ${interaction.commandName}`);

    try {
      await command.execute(interaction);
    } catch (_error) {
      const error = _error as Error;

      logger.error(error.message);
      logger.error(error.stack);

      try {
        if (interaction.isAutocomplete()) {
          return;
        }

        const reply: string | MessagePayload | InteractionReplyOptions = {
          content: 'There was an error while executing this command. Please try again later.',
          flags: MessageFlags.Ephemeral,
          embeds: [],
          components: [],
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(reply);
        } else {
          await interaction.reply(reply);
        }
      } catch (__error) {
        const subError = __error as Error;

        logger.error(subError.message);
        logger.error(subError.stack);
      }
    }
  }
})();
