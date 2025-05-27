import 'dotenv/config';

export const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  secretToken: process.env.SECRET_TOKEN,
  isDevelopment: process.env.NODE_ENV !== 'production',
  guildId: '666404385999552525',
};
