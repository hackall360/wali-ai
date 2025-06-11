import 'dotenv/config';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined in .env');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationConfig: MigrationConfig = {
	migrationsFolder: join(__dirname, 'migrations'),
};

export const migrateDatabase = async (): Promise<void> => await migrate(drizzle(process.env.DATABASE_URL as string), migrationConfig);

