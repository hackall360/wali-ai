import 'dotenv/config';

import KeyvPostgres from "@keyv/postgres";
import Keyv from "keyv";

import { logger } from '#utils/logger';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env');
}

export const keyv = new Keyv(new KeyvPostgres({ uri: process.env.DATABASE_URL, table: 'cache' }));

keyv.on('error', err => logger.error('Keyv connection error:', err));
