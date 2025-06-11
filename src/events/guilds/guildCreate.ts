import { Events, Guild } from 'discord.js';

import { database } from '#database';
import { guilds } from '#database/schema';
import { Event } from '#models/event';
import { logger } from '#utils/logger';
import { totalGuilds, totalUsers } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onGuildCreate', Events.GuildCreate);
  }

  async listener(guild: Guild): Promise<void> {
    if (!guild.available) return;

    totalGuilds.inc();

    for (const [, g] of guild.client.guilds.cache) {
      totalUsers.set({ guildId: g.id }, g.memberCount);
    }

    try {
      await database.insert(guilds).values({ id: guild.id }).onConflictDoNothing({ target: guilds.id });
    } catch (error) {
      logger.error(`Error while inserting ${guild.id} in database: ${error}`);
    }
  }
})();
