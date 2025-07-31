import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const wallet = sqliteTable('wallet', {
  id: text('id').primaryKey().unique(),
  title: text('title').notNull(),
  accountId: text('account_id').notNull(),
  reference: text('reference').notNull().unique(),
  iban: text('iban').unique(),
  details: text('details'),
  currencies: text('currencies', { mode: 'json' }), // [aoa, usd]
  active: integer('active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});
