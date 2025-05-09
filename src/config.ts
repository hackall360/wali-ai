import 'dotenv/config';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const config = {
  token: process.env.DISCORD_BOT_TOKEN,
  guildId: '666404385999552525',
  apiUrl: process.env.GT_API_URL,
  cdnUrl: process.env.GT_CDN_URL,
  isDevelopment,
};
