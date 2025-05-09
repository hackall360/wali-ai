import { ActivityType, Client, GatewayIntentBits, Options } from 'discord.js';

import { registerCommands } from '#commands';
import { config } from '#config';
import { registerEvents } from '#events';
import { logger } from '#utils/logger';

const client = new Client({
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

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled rejection: ${reason}`);
  process.exit(1);
});
