import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  chatInputApplicationCommandMention,
  inlineCode,
  unorderedList,
} from 'discord.js';

import { Command } from '#models/command';
import { Embed } from '#models/embed';
import { BOT_PERMISSIONS, KO_FI_URL } from '#utils/common';

export default new (class extends Command {
  constructor() {
    super({
      name: 'help',
      description: 'Returns a list of available commands',
    });
  }

  override async execute(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.deferred) await interaction.deferReply();

    const commands = await interaction.client.application.commands.fetch();

    if (!commands) {
      interaction.editReply({
        content: 'No commands found.',
      });
      return;
    }

    const list = commands.map((command) => {
      const names: string[] = [];
      const commandNameMention = chatInputApplicationCommandMention(command.name, command.id);

      const hasSubcommandsOrGroups =
        command.options &&
        command.options.some(
          (option) =>
            option.type === ApplicationCommandOptionType.Subcommand ||
            option.type === ApplicationCommandOptionType.SubcommandGroup
        );

      if (!hasSubcommandsOrGroups) {
        names.push(commandNameMention);
      }

      if (command.options) {
        for (const option of command.options) {
          switch (option.type) {
            case ApplicationCommandOptionType.Subcommand:
              names.push(chatInputApplicationCommandMention(command.name, option.name, command.id));
              break;
            case ApplicationCommandOptionType.SubcommandGroup:
              names.push(chatInputApplicationCommandMention(command.name, option.name, command.id));
              if (option.options) {
                for (const subcommand of option.options) {
                  names.push(chatInputApplicationCommandMention(command.name, subcommand.name, command.id));
                }
              }
              break;
          }
        }
      }

      return `${names.join(' - ')} : ${command.description}`;
    });

    const embed = new Embed();

    embed.setAuthor({
      name: `${interaction.client.user.username}'s commands`,
      iconURL: interaction.client.user.displayAvatarURL(),
    });

    embed.setThumbnail(interaction.client.user.displayAvatarURL());

    embed.setDescription(
      [
        `Here is a list of all my commands. You can also see them when you type ${inlineCode('/')} in Discord.`,
        unorderedList(list),
      ].join('\n\n')
    );

    embed.setFooter({
      text: interaction.client.user.username,
      iconURL: interaction.client.user.displayAvatarURL(),
    });

    embed.setTimestamp();

    const components = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder({
          label: 'Invite me',
          style: ButtonStyle.Link,
          url: interaction.client.generateInvite(BOT_PERMISSIONS),
        }),
        new ButtonBuilder({
          label: 'Support the developer',
          style: ButtonStyle.Link,
          url: KO_FI_URL,
        }),
      ],
    });

    await interaction.editReply({
      embeds: [embed],
      components: [components],
    });
  }
})();
