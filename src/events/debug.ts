import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onDebug', Events.Debug);
  }

  async listener(message: string): Promise<void> {
    if (!message.match(/heartbeat/gi)) logger.debug(message);
  }
})();
