import { ACCOUNT_TYPE_ENUM } from '@repo/types/account';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const account = sqliteTable('accounts', {
  id: text('id').primaryKey().unique(),
  name: text('name').notNull(),
  type: t.text().$type<ACCOUNT_TYPE_ENUM>().notNull(),
  currencies: text('currencies', { mode: 'json' }), // [aoa, usd]
  siteUrl: text('site_url'),
  swiftCode: text('swift_code'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});
