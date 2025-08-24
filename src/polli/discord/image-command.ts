// polli/discord/image-command.ts
import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js";
import { Polli } from "../client.js";

const polli = new Polli({
  token: process.env.POLLINATIONS_TOKEN,  // keep server-side
  referrer: "SpongeDiscordBot",
});

export async function runImage(interaction: ChatInputCommandInteraction) {
  const prompt = interaction.options.getString("prompt", true);
  await interaction.deferReply();

  const buf = await polli.generateImage(
    prompt,
    { width: 768, height: 768, model: "flux", nologo: true, private: true },
    { asBuffer: true }
  );

  const file = new AttachmentBuilder(buf as Buffer, { name: "polli.png" });
  await interaction.editReply({ files: [file] });
}
