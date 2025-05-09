import { ActivityType, Client, Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onReady', Events.ClientReady, { once: true });
  }

  async listener(client: Client): Promise<void> {
    logger.info(
      `Logged in as ${client.user?.tag}, ready to serve ${client.guilds.cache.size} servers ${client.shard?.ids.length ? `on shard #${client.shard.ids[0]}` : ''}`
    );
  }
})();
