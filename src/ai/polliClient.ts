import { Polli } from '../polli';

import { config } from '#config';
import { logger } from '#utils/logger';

let polliClient: Polli | null = null;

if (!config.pollinationsToken) {
  logger.error('Missing Pollinations token. Skipping LLM features.');
} else {
  polliClient = new Polli({ token: config.pollinationsToken, referrer: 'WaliBot' });
}

export { polliClient };
