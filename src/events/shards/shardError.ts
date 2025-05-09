import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onShardError', Events.ShardError);
  }

  async listener(error: Error, shardId: number): Promise<void> {
    logger.error(`Shard #${shardId} encountered an error: ${error.message}`);
  }
})();
