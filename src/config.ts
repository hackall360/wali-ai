import 'dotenv/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  guildId: '666404385999552525',
  isDevelopment,
};
