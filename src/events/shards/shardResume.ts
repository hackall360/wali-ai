import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onShardResume', Events.ShardResume);
  }

  async listener(shardId: number): Promise<void> {
    logger.info(`Shard #${shardId} has resumed successfully`);
  }
})();
