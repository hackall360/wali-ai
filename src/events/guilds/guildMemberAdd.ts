import { Events, GuildMember } from 'discord.js';

import { Event } from '#models/event';
import { totalUsers } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onGuildMemberAdd', Events.GuildMemberAdd);
  }

  async listener(member: GuildMember): Promise<void> {
    if (!member.guild.available) return;

    totalUsers.inc({ guildId: member.guild.id });
  }
})();

