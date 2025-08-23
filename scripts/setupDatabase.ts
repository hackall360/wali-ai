import EmbeddedPostgres from 'embedded-postgres';
import {
  accessSync,
  constants,
  existsSync,
  chmodSync,
} from 'fs';
import path from 'path';
import { createRequire } from 'module';

// Ensure the embedded postgres binaries are executable
const require = createRequire(import.meta.url);
const embeddedMain = require.resolve('@embedded-postgres/linux-x64');
const initdbPath = path.resolve(
  path.dirname(embeddedMain),
  '..',
  'native/bin/initdb',
);

try {
  accessSync(initdbPath, constants.X_OK);
} catch {
  chmodSync(initdbPath, 0o755);
}

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
