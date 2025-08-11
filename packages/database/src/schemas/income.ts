import { INCOME_STATUS_ENUM, RECURRENCE_TYPE_ENUM } from '@repo/types';
import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const income = sqliteTable('incomes', {
  id: text('id').primaryKey().unique(),
  walletId: text('wallet_id'),
  description: text('description'),
  amount: real('amount').notNull().default(0.0),
  type: text().$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE),
  recurrence: integer('recurrence'),
  duration: integer('duration'),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  currency: text('currency', { length: 3 }),
  estimatedDateReceipt: integer('estimated_date_receipt', { mode: 'timestamp' }),
  status: text().$type<INCOME_STATUS_ENUM>().default(INCOME_STATUS_ENUM.PENDING),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});
