import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';

import { config } from '#config';
import * as schema from '#database/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

export const database = drizzle(process.env.DATABASE_URL, { schema, logger: config.isDevelopment });
