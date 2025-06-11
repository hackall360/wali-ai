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
        // Remove HTML tags except Discord user/channel/role mentions and command mentions
        .replace(/<(?![@#][!&]?\d+>|\/[a-zA-Z0-9_]+:\d+>|\/\S+ \S+:\S+>)[^>]+>/g, '')
        // Remove HTML entities
        .replace(/&[a-zA-Z0-9#]+;/g, '');
    }
    return super.setDescription(description);
  }
}
