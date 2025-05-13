import { EmbedBuilder } from "discord.js";

export class Embed extends EmbedBuilder {
  constructor() {
    super();
    this.setColor(0xf3deb5);
  }

  override setDescription(description: string | null): this {
    if (description) {
      description = description
        .replace(/<[^>]+>/g, "") // remove HTML tags
        .replace(/&[a-zA-Z0-9#]+;/g, ""); // remove HTML entities
    }
    return super.setDescription(description);
  }
}
