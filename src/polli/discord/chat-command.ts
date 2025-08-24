// polli/discord/chat-command.ts
import { ChatInputCommandInteraction } from "discord.js";
import { Polli, type ChatMessage } from "../index.js";

const polli = new Polli({
  token: process.env.POLLINATIONS_TOKEN,
  referrer: "SpongeDiscordBot",
});

export async function runChat(interaction: ChatInputCommandInteraction) {
  const prompt = interaction.options.getString("prompt", true);
  await interaction.deferReply();

  const messages: ChatMessage[] = [
    { role: "system", content: "You are a concise, helpful game assistant." },
    { role: "user", content: prompt },
  ];

  const reply = await polli.chatComplete(messages, { model: "openai", temperature: 0.6 });
  await interaction.editReply(reply);
}
