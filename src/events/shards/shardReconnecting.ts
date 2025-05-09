import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onShardReconnecting', Events.ShardReconnecting);
  }

  async listener(id: number): Promise<void> {
    logger.warn(`Shard #${id} is reconnecting...`);
  }
})();
