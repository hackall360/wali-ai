// Relative import requires explicit extension for NodeNext module resolution
import { Polli } from '../polli/index.js';

import { config } from '#config';
import { logger } from '#utils/logger';

let polliClient: Polli | null = null;

if (!config.pollinationsToken) {
  logger.error('Missing Pollinations token. Skipping LLM features.');
} else {
  polliClient = new Polli({ token: config.pollinationsToken, referrer: 'WaliBot' });
}

export { polliClient };
