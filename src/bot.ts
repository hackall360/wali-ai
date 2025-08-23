import { ActivityType, Client, GatewayIntentBits, Options } from 'discord.js';

import { config } from '#config';
import { startDatabase, stopDatabase } from '#database/server';
import { logger } from '#utils/logger';

if (config.isDevelopment) {
  await startDatabase();
}

const { registerEvents } = await import('#events');
const { registerCommands } = await import('#commands');

const client = new Client<true>({
  shards: 'auto',
  intents: [GatewayIntentBits.Guilds],
  presence: {
    status: 'online',
    activities: [
      {
        name: 'dune.gaming.tools',
        type: ActivityType.Watching,
      },
    ],
  },
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    ApplicationCommandManager: 0,
    AutoModerationRuleManager: 0,
    BaseGuildEmojiManager: 0,
    GuildBanManager: 0,
    GuildEmojiManager: 0,
    GuildForumThreadManager: 0,
    GuildInviteManager: 0,
    GuildMemberManager: {
      maxSize: 1,
      keepOverLimit: (member) => member.id === member.client.user.id,
    },
    GuildStickerManager: 0,
    GuildTextThreadManager: 0,
    MessageManager: 0,
    PresenceManager: 0,
    ReactionManager: 0,
    ReactionUserManager: 0,
    StageInstanceManager: 0,
    ThreadManager: 0,
    ThreadMemberManager: 0,
    UserManager: 0,
    VoiceStateManager: 0,
    DMMessageManager: 0,
    GuildMessageManager: 0,
    GuildScheduledEventManager: 0,
  }),
});

await registerEvents(client);

await client.login(config.token);

await registerCommands(client);

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down...');
  client.destroy();
  stopDatabase().finally(() => process.exit(0));
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down...');
  client.destroy();
  stopDatabase().finally(() => process.exit(0));
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  stopDatabase().finally(() => process.exit(1));
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
  stopDatabase().finally(() => process.exit(1));
});
