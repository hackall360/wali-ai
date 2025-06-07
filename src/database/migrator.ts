import 'dotenv/config';

import type { MigrationConfig } from 'drizzle-orm/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined in .env');
}

const migrationClient = new pg.Client({
	connectionString: process.env.DATABASE_URL,
});

const migrationConfig: MigrationConfig = {
	migrationsFolder: 'migrations',
};

export const migrateDatabase = () => {
	return migrate(
		drizzle(migrationClient, {
			logger: true,
		}),
		migrationConfig
	);
};
