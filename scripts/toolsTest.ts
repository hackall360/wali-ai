import { Polli } from '../polli';
import { tools, exec } from '../src/ai/tools';

// Simple script to exercise the tools layer without Discord.
// Usage: tsx scripts/toolsTest.ts

const polli = new Polli({ token: process.env.POLLINATIONS_TOKEN });

const messages = [
  { role: 'user' as const, content: 'Tell me about water.' },
];

const { finalText } = await polli.chatWithTools(messages, tools, exec);

console.log(finalText);
