import EmbeddedPostgres from 'embedded-postgres';

let pg: EmbeddedPostgres | null = null;

const options = {
  databaseDir: './data/db',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  persistent: true,
  createPostgresUser: true,
};

export const startDatabase = async (): Promise<void> => {
  if (pg) {
    return;
  }
  pg = new EmbeddedPostgres(options);
  await pg.initialise();
  await pg.start();
  process.env.DATABASE_URL = `postgres://${options.user}:${options.password}@localhost:${options.port}/postgres`;
};

export const stopDatabase = async (): Promise<void> => {
  if (!pg) {
    return;
  }
  await pg.stop();
  pg = null;
};
