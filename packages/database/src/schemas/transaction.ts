import { TRANSACTION_TYPE_ENUM } from '@repo/types/transaction';
import { sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/sqlite-core';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const transaction = sqliteTable('transactions', {
  id: text('id').primaryKey().unique(),
  type: t.text('type').$type<TRANSACTION_TYPE_ENUM>().notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  totalAmount: real('total_amount').notNull().default(0.0),
  note: text('note'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});

export const transactionIncome = sqliteTable('transactions_incomes', {
  transactionId: text('transaction_id').notNull(),
  incomeId: text('income_id').notNull(),
  amount: real('amount').notNull().default(0.0),
});

export const transactionExpenses = sqliteTable('transactions_expenses', {
  transactionId: text('transaction_id').notNull(),
  expenseId: text('expense_id').notNull(),
  amount: real('amount').notNull().default(0.0),
  quantity: real('quantity').notNull().default(1),
  total: real('total').notNull().default(0.0),
  locationId: integer('location_id'),
  incomeId: text('income_id'),
});
