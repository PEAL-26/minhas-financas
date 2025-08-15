import { PRIORITY_ENUM } from '@repo/types/priority';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { WISHLIST_STATUS_ENUM } from '@repo/types/status';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const wishlist = sqliteTable('wishlist', {
  id: text('id').primaryKey().unique(),
  name: text('name').notNull(),
  type: t.text().$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE).notNull(),
  recurrence: integer('recurrence'),
  categoryId: text('category_id'),
  targetDate: integer('target_date', { mode: 'timestamp' }),
  priority: integer('priority').$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
  expectedLocationId: text('expected_location_id'),
  estimatedCost: real('estimated_cost'),
  quantity: real('quantity'),
  total: real('total'),
  status: t.text('status').$type<WISHLIST_STATUS_ENUM>().default(WISHLIST_STATUS_ENUM.PENDING),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const wishlistPrice = sqliteTable('wishlist_prices', {
  wishlistId: text('wishlist_id'),
  locationId: text('location_id'),
  amount: real('amount').notNull(),
});
