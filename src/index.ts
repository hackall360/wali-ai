import { ShardingManager } from 'discord.js';

import { config } from '#config';
import { logger } from '#utils/logger';

const path = config.isDevelopment ? './src/bot.ts' : './dist/bot.js';

const manager = new ShardingManager(path, {
  token: config.token,
  totalShards: config.isDevelopment ? 1 : 'auto',
  respawn: true,
  execArgv: config.isDevelopment ? ['--import=tsx'] : [],
});

manager.on('shardCreate', (shard) => logger.info(`Launched shard #${shard.id}`));

manager
  .spawn({
    timeout: 60000,
  })
  .catch((error) => {
    logger.error(`Failed to spawn shards: ${error}`);
    process.exit(1);
  })
  .then(() => logger.info('All shards launched'));

process.on('SIGINT', () => {
  logger.info('Received SIGINT. Shutting down...');
  manager.shards.forEach((shard) => shard.kill());
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM. Shutting down...');
  manager.shards.forEach((shard) => shard.kill());
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
  process.exit(1);
});
