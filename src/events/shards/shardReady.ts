import { Events, type Snowflake } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onShardReady', Events.ShardReady);
  }

  async listener(id: number, unavailableGuilds: Set<Snowflake> | null): Promise<void> {
    logger.info(`Shard #${id} ready ${unavailableGuilds ? `with ${unavailableGuilds.size} unavailable guilds` : ''}`);
  }
})();
