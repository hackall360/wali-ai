import { Client } from 'discord.js';
import { glob } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const registerEvents = async (client: Client): Promise<void> => {
  const filesPath = await glob('**/*.{ts,js}', {
    cwd: __dirname,
    ignore: ['index.ts', 'index.js'],
  });

  logger.info(`Loading ${filesPath.length} event(s)`);

  for (const filePath of filesPath) {
    const { default: file } = await import(resolve(__dirname, filePath));

    const event = file as Event;

    if (!event || !(event instanceof Event)) {
      logger.warn(`Invalid event file: ${filePath}`);
      continue;
    }

    if (event.options?.disabled) {
      logger.warn(`Skipped event: ${event.name}`);
      continue;
    }

    logger.info(`Loaded event: ${event.name}`);

    if (event.options?.once) {
      client.once(event.event, (...args) => event.listener(...args));
    } else {
      client.on(event.event, (...args) => event.listener(...args));
    }
  }

  logger.info(`Loaded ${filesPath.length} event(s)`);
}
