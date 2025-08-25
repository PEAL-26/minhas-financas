import { TRANSACTION_TYPE_ENUM } from '@repo/types/transaction';

import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'transactions';

const fields = {
  pglite: {
    type: pgCore.text('type').$type<TRANSACTION_TYPE_ENUM>().notNull(),
    date: pgCore.timestamp('date').notNull(),
    totalAmount: pgCore.real('total_amount').notNull().default(0.0),
    note: pgCore.text('note'),
  },
  sqlite: {
    type: sqliteCore.text('type').$type<TRANSACTION_TYPE_ENUM>().notNull(),
    date: sqliteCore.integer('date', { mode: 'timestamp' }).notNull(),
    totalAmount: sqliteCore.real('total_amount').notNull().default(0.0),
    note: sqliteCore.text('note'),
  },
};

const schema = {
  sqlite: sqliteCore.sqliteTable(tableName, {
    ...columns.primaryKey.sqlite,
    ...fields.sqlite,
    ...columns.timestamps.sqlite,
  }),
  pglite: pgCore.pgTable(tableName, {
    ...columns.primaryKey.pglite,
    ...fields.pglite,
    ...columns.timestamps.pglite,
  }),
};

export const transaction = schema[databaseConfig.driver];

const transactionIncomeTableName = 'transactions_incomes';
export const transactionIncome = {
  sqlite: sqliteCore.sqliteTable(transactionIncomeTableName, {
    transactionId: sqliteCore.text('transaction_id').notNull(),
    incomeId: sqliteCore.text('income_id').notNull(),
    amount: sqliteCore.real('amount').notNull().default(0.0),
  }),
  pglite: pgCore.pgTable(transactionIncomeTableName, {
    transactionId: pgCore.text('transaction_id').notNull(),
    incomeId: pgCore.text('income_id').notNull(),
    amount: pgCore.real('amount').notNull().default(0.0),
  }),
}[databaseConfig.driver];

const transactionExpenseTableName = 'transactions_expenses';
export const transactionExpense = {
  sqlite: sqliteCore.sqliteTable(transactionExpenseTableName, {
    transactionId: sqliteCore.text('transaction_id').notNull(),
    expenseId: sqliteCore.text('expense_id').notNull(),
    amount: sqliteCore.real('amount').notNull().default(0.0),
    quantity: sqliteCore.real('quantity').notNull().default(1),
    total: sqliteCore.real('total').notNull().default(0.0),
    locationId: sqliteCore.integer('location_id'),
    incomeId: sqliteCore.text('income_id'),
  }),
  pglite: pgCore.pgTable(transactionExpenseTableName, {
    transactionId: pgCore.text('transaction_id').notNull(),
    expenseId: pgCore.text('expense_id').notNull(),
    amount: pgCore.real('amount').notNull().default(0.0),
    quantity: pgCore.real('quantity').notNull().default(1),
    total: pgCore.real('total').notNull().default(0.0),
    locationId: pgCore.integer('location_id'),
    incomeId: pgCore.text('income_id'),
  }),
}[databaseConfig.driver];
