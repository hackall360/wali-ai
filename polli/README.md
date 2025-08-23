# Polli (Pollinations mini-wrapper) — Plug & Play

Drop-in TypeScript client for **Pollinations** image + chat (OpenAI-compatible), with **tool calling** support.
No external dependencies. Works in **Node 18+**, **Bun**, **Deno**, and modern browsers.

> Endpoints: Image (`GET https://image.pollinations.ai/prompt/{prompt}` + `/models`), Text (`GET https://text.pollinations.ai/{prompt}`), and **OpenAI-compatible** Chat (`POST https://text.pollinations.ai/openai`) with streaming + function calling.

## Files

```
/polli/
  README.md
  env.example
  index.ts
  client.ts
  types.ts
  utils.ts
  discord/
    image-command.ts
    chat-command.ts
    chat-tools-command.ts
  examples/
    node-tools-demo.ts
```

## Quick Start (Node)

1) Copy the whole `/polli` folder into your project.
2) Set the environment variable (server side): `POLLINATIONS_TOKEN=...`
3) Use it:

```ts
import { Polli } from "./polli";

const polli = new Polli({ token: process.env.POLLINATIONS_TOKEN, referrer: "MyBot" });

// Image
const buf = await polli.generateImage("ultra-detailed ornithopter", {
  width: 768, height: 512, model: "flux", nologo: true, private: true,
}, { asBuffer: true });
```

### Tool-enabled Chat

```ts
import { Polli, ChatMessage, Tool } from "./polli";

const polli = new Polli({ token: process.env.POLLINATIONS_TOKEN, referrer: "MyBot" });

const tools: Tool[] = [{
  type: "function",
  function: {
    name: "get_time",
    description: "Get current server time (ISO).",
    parameters: { type: "object", properties: {}, additionalProperties: false },
  }
}];

const exec = {
  async get_time() { return { now: new Date().toISOString() }; }
};

const messages: ChatMessage[] = [
  { role: "system", content: "You can call tools as needed." },
  { role: "user", content: "What time is it?" }
];

const { finalText } = await polli.chatWithTools(messages, tools, exec, {
  model: "openai",
  temperature: 0.2,
  tool_choice: "auto",
});
console.log(finalText);
```

### Discord commands
See `./polli/discord/*.ts` for ready-to-use command handlers (slash commands).

## Browser usage (referrer-based)

```ts
import { Polli } from "/polli";

const polli = new Polli({ referrer: "MyWebClient" });
const url = polli.buildImageURL("cinematic spice harvester", { width: 640, height: 360, nologo: true });
document.querySelector("img")!.setAttribute("src", url);
```

## Notes
- The wrapper retries on `429` and `5xx` with exponential backoff.
- Pass `private: true` if you prefer generations not to appear in public feeds.
- Use `listImageModels()` to discover current image models.
- Tool calling follows the OpenAI format: tools array, tool_calls in assistant messages, and tool results as `role: "tool"` with `tool_call_id`.
