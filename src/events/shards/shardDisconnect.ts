import { type CloseEvent, Events, type Snowflake } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onShardDisconnect', Events.ShardDisconnect);
  }

  async listener(event: CloseEvent, id: number): Promise<void> {
    logger.warn(`Shard #${id} disconnected with code ${event.code}`);
  }
})();
