import EmbeddedPostgres from 'embedded-postgres';

const pg = new EmbeddedPostgres({
  databaseDir: './data/db',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  persistent: true,
  createPostgresUser: true,
});

try {
  await pg.initialise();
  console.log('Database setup complete');
} catch (error) {
  console.error(`Failed to setup database: ${error}`);
  process.exit(1);
}
