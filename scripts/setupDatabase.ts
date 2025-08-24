import EmbeddedPostgres from 'embedded-postgres';
import {
  accessSync,
  constants,
  existsSync,
  chmodSync,
  lstatSync,
  readdirSync,
} from 'fs';
import path from 'path';
import { createRequire } from 'module';

// Ensure the embedded Postgres binaries are executable. Some environments may
// strip the executable bit during installation which causes spawn to fail with
// EACCES. To avoid that, walk through all binaries in the `native/bin`
// directory and grant execute permissions when needed.
const require = createRequire(import.meta.url);

// The embedded-postgres package ships platform specific bundles under
// `@embedded-postgres/<platform>-<arch>`. Resolve the bundle for the current
// environment and fall back to the Linux x64 build if resolution fails (e.g.
// when running in an unsupported environment).
const platformPackage = `@embedded-postgres/${process.platform}-${process.arch}`;
let embeddedMain: string;
try {
  embeddedMain = require.resolve(platformPackage);
} catch {
  embeddedMain = require.resolve('@embedded-postgres/linux-x64');
}

const binDir = path.resolve(path.dirname(embeddedMain), '..', 'native/bin');
if (existsSync(binDir)) {
  for (const file of readdirSync(binDir)) {
    const binaryPath = path.join(binDir, file);
    try {
      if (lstatSync(binaryPath).isFile()) {
        try {
          accessSync(binaryPath, constants.X_OK);
        } catch {
          try {
            chmodSync(binaryPath, 0o755);
          } catch (err) {
            console.warn(`Unable to set execute permission on ${binaryPath}: ${err}`);
          }
        }
      }
    } catch (err) {
      console.warn(`Skipping permission check for ${binaryPath}: ${err}`);
    }
  }
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

