import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'fs';
import path from 'path';

const dataDir = './data/db';

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  persistent: true,
  createPostgresUser: true,
  initdbFlags: ['--encoding=UTF8'],
});

try {
  if (!existsSync(path.join(dataDir, 'PG_VERSION'))) {
    await pg.initialise();
    console.log('Database setup complete');
  } else {
    console.log('Database already initialised');
  }
} catch (error) {
  console.error(`Failed to setup database: ${error}`);
  process.exit(1);
}
