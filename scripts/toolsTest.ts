// Update import paths to include explicit extensions under NodeNext resolution
import { Polli } from '../src/polli/index.js';
import { tools, exec } from '../src/ai/tools.js';
import { api } from '../src/utils/api.js';

// Simple script to exercise the tools layer without Discord.
// Usage: tsx scripts/toolsTest.ts

// --- Mock network layer ----------------------------------------------------
// The execution environment in CI does not allow outbound network requests.
// To keep this script useful, we stub both the Pollinations API responses and
// the dune.gaming.tools `api.get`/`api.search` helpers.

// Stub search and get to avoid real HTTP requests
(api as any).search = async () => [
  { name: 'Water', path: 'items/water' },
];
(api as any).get = async () => ({ name: 'Water', description: 'H2O in its liquid form.' });

// Mock fetch used inside Polli.chatWithTools
let call = 0;
globalThis.fetch = async () => {
  call++;
  if (call === 1) {
    // First call: instruct Polli to invoke our get_item tool
    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              content: null,
              tool_calls: [
                {
                  id: '1',
                  function: { name: 'get_item', arguments: JSON.stringify({ query: 'Water' }) },
                },
              ],
            },
          },
        ],
      }),
      { status: 200 },
    );
  }

  // Second call: return the final assistant message
  return new Response(
    JSON.stringify({
      choices: [
        { message: { content: 'Water is essential for life.' } },
      ],
    }),
    { status: 200 },
  );
};

const polli = new Polli();

const messages = [
  { role: 'user' as const, content: 'Tell me about water.' },
];

const { finalText } = await polli.chatWithTools(messages, tools, exec);

console.log(finalText);
