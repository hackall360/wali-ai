import type { Snowflake } from 'discord.js';

import { LRUCache } from 'lru-cache';

export const contributors = new LRUCache<Snowflake, Date>({
  max: 1000,
  ttl: 1000 * 60 * 60,
  ttlAutopurge: true
});

export const cache = new LRUCache<string, any>({
	max: 100,
	ttl: 1000 * 60 * 60,
	ttlAutopurge: true
});
