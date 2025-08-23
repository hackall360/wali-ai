import { ShardingManager } from 'discord.js';

import { config } from '#config';
import { migrateDatabase } from '#database/migrator';
import { startDatabase, stopDatabase } from '#database/server';
import { serviceManager } from '#models/service';
import { logger } from '#utils/logger';

let manager: ShardingManager | null = null;

const main = async (): Promise<void> => {
  try {
    await startDatabase();
    logger.info('Local database started');
  } catch (error) {
    logger.error(`Failed to start database: ${error}`);
    process.exit(1);
  }

  try {
    await migrateDatabase();
    logger.info('Database migration completed successfully');
  } catch (error) {
    logger.error(`Failed to migrate database: ${error}`);
    await stopDatabase();
    process.exit(1);
  }

  const path = config.isDevelopment ? './src/bot.ts' : './dist/bot.js';

  manager = new ShardingManager(path, {
    token: config.token,
    totalShards: config.isDevelopment ? 1 : 'auto',
    respawn: true,
    execArgv: config.isDevelopment ? ['--import=tsx'] : [],
  });

  manager.on('shardCreate', (shard) => logger.info(`Launched shard #${shard.id}`));

  try {
    await manager.spawn({ timeout: 60000 });
    logger.info('All shards launched');

    serviceManager.initialize(manager);

    const { deepDesert } = await import('#services/deepDesert');
    serviceManager.registerService(deepDesert);

    await serviceManager.startServices();
  } catch (error) {
    logger.error(`Failed to spawn shards: ${error}`);
    await stopDatabase();
    process.exit(1);
  }
};

const handleShutdown = (signal: string): void => {
  logger.info(`Received ${signal}. Shutting down...`);

  serviceManager
    .stopServices()
    .then(async () => {
      if (manager) {
        for (const shard of manager.shards.values()) {
          shard.kill();
        }
        logger.info('All shards killed');
      }
      await stopDatabase();
      logger.info('Database stopped');
      process.exit(0);
    })
    .catch(async (error) => {
      logger.error(`Error during shutdown: ${error}`);
      await stopDatabase();
      process.exit(1);
    });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  stopDatabase().finally(() => process.exit(1));
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
  stopDatabase().finally(() => process.exit(1));
});

main().catch((error) => {
  logger.error(`Fatal error: ${error}`);
  stopDatabase().finally(() => process.exit(1));
});
