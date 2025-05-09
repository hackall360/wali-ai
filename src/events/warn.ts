import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onWarn', Events.Warn);
  }

  async listener(info: string): Promise<void> {
    logger.warn(`Warning encountered: ${info}`);
  }
})();
