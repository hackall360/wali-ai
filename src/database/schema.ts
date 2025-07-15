import { index, pgEnum, pgTable } from 'drizzle-orm/pg-core';

export const webhookTypeEnum = pgEnum('webhook_type', ['DEEP_DESERT']);

export const guilds = pgTable('guilds', (t) => ({
  id: t.text('id').primaryKey().notNull(),
  locale: t.text('locale').default('en').notNull(),
  createdAt: t.timestamp('created_at', { mode: "date", withTimezone: true }).$type<Date>().notNull().defaultNow(),
  updatedAt: t.timestamp('updated_at', { mode: "date", withTimezone: true }).$type<Date>().$onUpdate(() => new Date()),
}), (table) => [
  index('guilds_locale_idx').on(table.locale),
]);

export type Guild = typeof guilds.$inferSelect;

export const webhookChannels = pgTable('webhook_channels', (t) => ({
  id: t.text('id').primaryKey().notNull(),
  guildId: t.text('guild_id').notNull().references(() => guilds.id, { onDelete: 'cascade' }),
  channelId: t.text('channel_id').notNull(),
  webhookId: t.text('webhook_id').notNull(),
  webhookToken: t.text('webhook_token').notNull(),
  webhookType: webhookTypeEnum().notNull(),
  createdAt: t.timestamp('created_at', { mode: "date", withTimezone: true }).$type<Date>().notNull().defaultNow(),
  updatedAt: t.timestamp('updated_at', { mode: "date", withTimezone: true }).$type<Date>().$onUpdate(() => new Date()),
}), (table) => [
  index('webhook_channels_guild_idx').on(table.guildId),
  index('webhook_channels_channel_idx').on(table.channelId),
  index('webhook_channels_broadcast_types_idx').on(table.webhookType),
]);

export type WebhookChannel = typeof webhookChannels.$inferSelect;
export type NewWebhookChannel = typeof webhookChannels.$inferInsert;
