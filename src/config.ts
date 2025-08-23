import 'dotenv/config';

export const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  clientId: process.env.DISCORD_CLIENT_ID,
  guildId: process.env.DISCORD_GUILD_ID,
  secretToken: process.env.SECRET_TOKEN,
  entitlementsSecretToken: process.env.ENTITLEMENTS_SECRET_TOKEN,
  aiChannelId: process.env.AI_CHANNEL_ID,
  pollinationsToken: process.env.POLLINATIONS_TOKEN,
  isDevelopment: process.env.NODE_ENV !== 'production',
};
