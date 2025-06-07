// import {
//   ApplicationCommandOptionType,
//   CommandInteraction,
//   InteractionContextType,
//   MessageFlags,
//   PermissionFlagsBits
// } from 'discord.js';

// import { database } from '#database';
// import { guilds } from '#database/schema';
// import { Command } from '#models/command';
// import { SUPPORTED_LOCALES_NAMES, type SupportedLocales } from '#utils/common';
// import { logger } from '#utils/logger';
// import { eq } from 'drizzle-orm';

// export default new (class extends Command {
//   constructor() {
//     super({
//       name: 'settings',
//       description: 'Configure the bot settings',
//       default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
//       contexts: [InteractionContextType.Guild],
//       options: [
//         {
//           name: 'locale',
//           description: 'Set the bot locale',
//           type: ApplicationCommandOptionType.Subcommand,
//           options: [
//             {
//               name: 'value',
//               description: 'The locale to set',
//               type: ApplicationCommandOptionType.String,
//               required: true,
//               choices: Object.entries(SUPPORTED_LOCALES_NAMES).map(([locale, name]) => ({
//                 name,
//                 value: locale,
//               })),
//             },
//           ],
//         },
//       ],

//     });
//   }

//   override async execute(interaction: CommandInteraction): Promise<void> {
//     if (!interaction.isChatInputCommand() || !interaction.inGuild()) return;

//     if (!interaction.deferred) await interaction.deferReply({ flags: MessageFlags.Ephemeral });

//     const options = interaction.options;

//     const group = options.getSubcommandGroup();
//     const subcommand = options.getSubcommand();

//     let locale = options.getString('value') as SupportedLocales;

//     switch (subcommand) {
//       case 'locale':
//         try {
//           await database.update(guilds).set({ locale }).where(eq(guilds.id, interaction.guildId));
//         } catch (error) {
//           logger.error(`Error while updating locale for guild ${interaction.guild?.id}: ${error}`);
//           await interaction.editReply({
//             content: 'An error occurred while updating the locale.',
//           });
//         }

//         await interaction.editReply({
//           content: `Locale has been set to ${SUPPORTED_LOCALES_NAMES[locale]}.`,
//         });
//         break;

//       default:
//         await interaction.editReply({
//           content: 'Unknown subcommand.',
//         });
//     }
//   }
// })();
