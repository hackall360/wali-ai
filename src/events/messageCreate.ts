import { Events, Message } from 'discord.js';

import { polliClient } from '../ai/polliClient.js';
import { exec, tools } from '../ai/tools.js';

import { config } from '#config';
import { Event } from '#models/event';
import { logger } from '#utils/logger';

export default new (class extends Event {
  constructor() {
    super('onMessageCreate', Events.MessageCreate);
  }

  async listener(message: Message): Promise<void> {
    if (message.author.bot) return;
    if (!config.aiChannelId || message.channelId !== config.aiChannelId) return;
    if (!polliClient) {
      await message.reply('AI features are unavailable.');
      return;
    }

    const toolList = tools
      .map((t) => t.function?.name)
      .filter(Boolean)
      .join(', ');

    const messages = [
      {
        role: 'system',
        content: `You can call tools to answer accurately. Available tools: ${toolList}.`,
      },
      { role: 'user', content: message.content },
    ];

    try {
      const { finalText } = await polliClient.chatWithTools(messages, tools, exec, {
        model: 'openai',
        temperature: 0.2,
      });

      await message.reply(finalText ?? 'No response.');
    } catch (error) {
      logger.error((error as Error).message);
      await message.reply('There was an error processing your request.');
    }
  }
})();
