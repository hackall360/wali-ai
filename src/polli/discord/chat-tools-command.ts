// polli/discord/chat-tools-command.ts
// Example: tool-enabled chat. The model can call tools and we execute them here.
import { ChatInputCommandInteraction } from "discord.js";
import { Polli, type ChatMessage, type Tool } from "../index.js";

const polli = new Polli({
  token: process.env.POLLINATIONS_TOKEN,
  referrer: "SpongeDiscordBot",
});

// Define tools (OpenAI-compatible schema)
const tools: Tool[] = [
  {
    type: "function",
    function: {
      name: "search_items",
      description: "Search in-memory items by keyword. Demo placeholder.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
        },
        required: ["query"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_time",
      description: "Get current server time (ISO).",
      parameters: { type: "object", properties: {}, additionalProperties: false },
    },
  },
];

// Implement tool executor map
const exec = {
  async search_items({ query }: { query: string }) {
    // Replace with your own DB/query logic
    const sample = ["Kris Knife", "Stillsuit Mk II", "Ornithopter", "Harvester"];
    const hits = sample.filter(s => s.toLowerCase().includes(String(query || "").toLowerCase()));
    return { query, hits };
  },
  async get_time() {
    return { now: new Date().toISOString() };
  },
};

export async function runChatTools(interaction: ChatInputCommandInteraction) {
  const prompt = interaction.options.getString("prompt", true);
  await interaction.deferReply();

  const messages: ChatMessage[] = [
    { role: "system", content: "You can call tools to answer accurately. If tools return errors, explain gracefully." },
    { role: "user", content: prompt },
  ];

  const { finalText } = await polli.chatWithTools(messages, tools, exec, {
    model: "openai",
    temperature: 0.3,
    tool_choice: "auto",
  });

  await interaction.editReply(finalText ?? "(no response)");
}
