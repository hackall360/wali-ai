import { Client, EmbedBuilder } from 'discord.js';

export class Embed extends EmbedBuilder {
  constructor(client?: Client<true>) {
    super();
    this.setColor(0xf3deb5);
  }

  override setThumbnail(url: string | null): this {
    if (url && url.includes('{height}')) {
      const height = 256;
      url = url.replace('{height}', height.toString());
    }
    return super.setThumbnail(url);
  }

  override setDescription(description: string | null): this {
    if (description) {
      description = description
        .replace(/<[^>]+>/g, '') // remove HTML tags
        .replace(/&[a-zA-Z0-9#]+;/g, ''); // remove HTML entities
    }
    return super.setDescription(description);
  }
}
