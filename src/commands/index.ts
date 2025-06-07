import { Client, Collection, REST, type RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import { glob } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { config } from '#config';
import { Command } from '#models/command';
import { logger } from '#utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const commands = new Collection<string, Command>();

export const registerCommands = async (client: Client<true>): Promise<void> => {
  const filesPath = await glob('**/*.{ts,js}', {
    cwd: __dirname,
    ignore: ['index.ts', 'index.js'],
  });

  logger.info(`Loading ${filesPath.length} command(s)`);

  const data: RESTPostAPIApplicationCommandsJSONBody[] = [];

  for (const filePath of filesPath) {
    const { default: file } = await import(resolve(__dirname, filePath));

    const command = file as Command;

    if (!command || !(command instanceof Command)) {
      logger.warn(`Invalid command file: ${filePath}`);
      continue;
    }

    logger.info(`Loaded command: ${command.data.name}`);

    commands.set(command.data.name, command);

    data.push(command.data);
  }

  logger.info(`Loaded ${commands.size} command(s)`);

  if (!commands.size) {
    logger.warn(`Skipped application commands refresh`);
    return;
  }

  const rest = new REST({ version: '10' }).setToken(config.token!);

  try {
    logger.info('Started refreshing application (/) command(s)');

    if (config.isDevelopment) {
      await rest.put(Routes.applicationGuildCommands(client.application.id, config.guildId), { body: data });
    } else {
      await rest.put(Routes.applicationCommands(client.application.id), { body: data });
    }

    logger.info(`Successfully refreshed ${data.length} application (/) command(s)`);
  } catch (error) {
    logger.error(`Failed to refresh command(s): ${error}`);
  }
};
