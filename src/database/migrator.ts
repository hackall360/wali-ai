import 'dotenv/config';

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrationConfig: MigrationConfig = {
	migrationsFolder: join(__dirname, 'migrations'),
	migrationsTable: '_migrations'
};

export const migrateDatabase = () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined in .env');
	}
	return migrate(
		drizzle(
			postgres(process.env.DATABASE_URL, {
				prepare: false,
				max: 1
			})
		),
		migrationConfig
	);
};
