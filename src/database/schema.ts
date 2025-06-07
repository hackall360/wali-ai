import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const date = (name: string) => timestamp(name, { mode: "date", withTimezone: true }).$type<Date>();

export const guilds = pgTable('guilds', () => ({
  id: text('id').primaryKey().notNull(),
  locale: text('locale').default('en').notNull(),
  createdAt: date('created_at').notNull().defaultNow(),
  updatedAt: date('updated_at').$onUpdate(() => new Date()),
}));

export type Guild = typeof guilds.$inferSelect;
