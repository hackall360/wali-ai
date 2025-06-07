import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { config } from '#config';
import * as schema from '#database/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const database = drizzle(pool, { schema, logger: config.isDevelopment });
