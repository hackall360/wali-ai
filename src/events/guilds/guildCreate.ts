import { Events, Guild } from 'discord.js';

import { Event } from '#models/event';
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
  }
})();
