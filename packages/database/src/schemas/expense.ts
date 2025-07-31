import { EXPENSE_STATUS_ENUM, PRIORITY_ENUM, RECURRENCE_TYPE_ENUM } from '@repo/types';
import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const expense = sqliteTable('expenses', {
  id: text('id').primaryKey().unique(),
  wishlistId: text('wishlist_id'),
  incomeId: text('income_id'),
  categoryId: text('category_id'),
  title: text('title').notNull(),
  description: text('description'),
  estimatedDate: integer('estimated_date', { mode: 'timestamp' }),
  priority: integer().$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
  type: text('type').$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE),
  recurrence: integer('recurrence'),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  estimatedAmount: real('estimated_amount').notNull().default(0.0),
  quantity: real('quantity').notNull().default(1),
  total: real('total').notNull().default(0),
  status: text('status').$type<EXPENSE_STATUS_ENUM>().default(EXPENSE_STATUS_ENUM.PENDING),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const expensePrice = sqliteTable('expenses_prices', {
  locationId: text('location_id').notNull(),
  expenseId: text('expense_id').notNull(),
  amount: real('amount').notNull(),
});
