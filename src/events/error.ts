import { Events } from 'discord.js';

import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onError', Events.Error);
  }

  async listener(error: Error): Promise<void> {
    logger.error(`Encountered an error: ${error.message}`);
  }
})();
