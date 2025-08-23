declare module 'embedded-postgres' {
  interface Options {
    databaseDir?: string;
    user?: string;
    password?: string;
    port?: number;
    persistent?: boolean;
    createPostgresUser?: boolean;
  }

  export default class EmbeddedPostgres {
    constructor(options?: Options);
    initialise(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
  }
}
