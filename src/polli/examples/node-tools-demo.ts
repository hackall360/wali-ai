// polli/examples/node-tools-demo.ts
// Simple Node demo to run tool-enabled chat on the command line.
import { Polli, type ChatMessage, type Tool } from "../index.js";

async function main() {
  const polli = new Polli({ token: process.env.POLLINATIONS_TOKEN, referrer: "CLI-Demo" });

  const tools: Tool[] = [
    {
      type: "function",
      function: {
        name: "echo",
        description: "Echo an input string back.",
        parameters: {
          type: "object",
          properties: { text: { type: "string" } },
          required: ["text"],
          additionalProperties: false,
        },
      },
    }
  ];

  const exec = {
    async echo({ text }: { text: string }) { return { echoed: text }; }
  };

  const messages: ChatMessage[] = [
    { role: "system", content: "You are a helpful assistant. Use tools if they help." },
    { role: "user", content: "Please echo 'hello tools' via your tool." },
  ];

  const { finalText } = await polli.chatWithTools(messages, tools, exec, { model: "openai", temperature: 0.1 });
  console.log("Assistant:", finalText);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
