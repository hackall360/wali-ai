import { OAuth2Scopes, PermissionFlagsBits } from 'discord-api-types/v10';

export type DiscordPermissions = keyof typeof PermissionFlagsBits;

export const BOT_PERMISSIONS = {
  scopes: [OAuth2Scopes.ApplicationsCommands, OAuth2Scopes.Bot],
  permissions: [PermissionFlagsBits.ManageWebhooks, PermissionFlagsBits.EmbedLinks],
};

export const KO_FI_URL = 'https://ko-fi.com/glazk0';

export const DEVELOPERS = [
  // glazk0
  '247344130798256130',
];

export const DATABASE_URL = 'https://dune.gaming.tools';
