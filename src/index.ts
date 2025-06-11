import { ShardingManager } from 'discord.js';

import { config } from '#config';
import { migrateDatabase } from '#database/migrator';
import { logger } from '#utils/logger';

let manager: ShardingManager | null = null;

const main = async (): Promise<void> => {
  try {
    await migrateDatabase();
    logger.info('Database migration completed successfully');
  } catch (error) {
    logger.error(`Failed to migrate database: ${error}`);
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
  } catch (error) {
    logger.error(`Failed to spawn shards: ${error}`);
    process.exit(1);
  }
}

const handleShutdown = (signal: string): void => {
  logger.info(`Received ${signal}. Shutting down...`);
  if (manager) {
    for (const shard of manager.shards.values()) {
      shard.kill();
    }
  }
  process.exit(0);
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
  process.exit(1);
});

main().catch((error) => {
  logger.error(`Fatal error: ${error}`);
  process.exit(1);
});
