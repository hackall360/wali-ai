import { Events, GuildMember } from 'discord.js';

import { Event } from '#models/event';
import { totalUsers } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onGuildMemberRemove', Events.GuildMemberRemove);
  }

  async listener(member: GuildMember): Promise<void> {
    if (!member.guild.available) return;

    totalUsers.dec({ guildId: member.guild.id });
  }
})();
