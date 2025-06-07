import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from "postgres";

import { config } from '#config';
import * as schema from '#database/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

const connection = postgres(process.env.DATABASE_URL, { prepare: false });

export const database = drizzle(connection, { schema, logger: config.isDevelopment });
