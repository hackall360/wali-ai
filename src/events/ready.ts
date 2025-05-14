import { Client, Events } from 'discord.js';
import { createServer } from 'node:http';
import { register } from 'prom-client';

import { Event } from '#models/event';
import { logger } from '#utils/logger';
import { PROMETHEUS_PORT, totalGuilds, totalUsers } from '#utils/prometheus';

export default new (class extends Event {
  constructor() {
    super('onReady', Events.ClientReady, { once: true });
  }

  async listener(client: Client): Promise<void> {
    totalGuilds.set(client.guilds.cache.size);

    for (const [, guild] of client.guilds.cache) {
      totalUsers.set({ guildId: guild.id }, guild.memberCount);
    }

    const server = createServer(async (req, res) => {
      if (!req.url) {
        res.writeHead(404);
        res.end();
        return;
      }

      const route = new URL(req.url, `http://${req.headers.host}`).pathname;

      switch (route) {
        case '/metrics':
          res.setHeader('Content-Type', register.contentType);
          res.end(await register.metrics());
          break;
        default:
          res.writeHead(404);
          res.end();
          break;
      }
    });

    server.listen(PROMETHEUS_PORT, () => {
      logger.info(`Prometheus metrics available at http://localhost:${PROMETHEUS_PORT}/metrics`);
    });

    logger.info(
      `Logged in as ${client.user?.tag}, ready to serve ${client.guilds.cache.size} servers ${client.shard?.ids.length ? `on shard #${client.shard.ids[0]}` : ''}`
    );
  }
})();
