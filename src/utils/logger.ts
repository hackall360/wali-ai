import { createLogger, format, transports } from 'winston';

const { combine, timestamp, colorize, align, printf } = format;

// TODO: Add file support ? (docker volumes?)

export const logger = createLogger({
  level: 'info',
  transports: [new transports.Console()],
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
});
