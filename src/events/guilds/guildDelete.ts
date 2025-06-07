import { Events, Guild } from 'discord.js';
import { eq } from 'drizzle-orm';

import { database } from '#database';
import { guilds } from '#database/schema';
import { Event } from '#models/event';
import { logger } from '#utils/logger';
import { totalGuilds, totalUsers } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onGuildDelete', Events.GuildDelete);
  }

  async listener(guild: Guild): Promise<void> {
    if (!guild.available) return;

    totalGuilds.dec();

    for (const [, g] of guild.client.guilds.cache) {
      totalUsers.set({ guildId: g.id }, g.memberCount);
    }

    try {
      await database.delete(guilds).where(eq(guilds.id, guild.id));
    } catch (error) {
      logger.error(`Error while deleting ${guild.id} from database: ${error}`);
    }
  }
})();
