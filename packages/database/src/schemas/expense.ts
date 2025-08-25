import { PRIORITY_ENUM } from '@repo/types/priority';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { EXPENSE_STATUS_ENUM } from '@repo/types/status';
import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'expenses';

const fields = {
  pglite: {
    wishlistId: pgCore.text('wishlist_id'),
    incomeId: pgCore.text('income_id'),
    categoryId: pgCore.text('category_id'),
    description: pgCore.text('description'),
    estimatedDate: pgCore.timestamp('estimated_date'),
    priority: pgCore.integer().$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
    type: pgCore.text('type').$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE),
    recurrence: pgCore.integer('recurrence'),
    startDate: pgCore.timestamp('start_date'),
    endDate: pgCore.timestamp('end_date'),
    estimatedAmount: pgCore.real('estimated_amount').notNull().default(0.0),
    quantity: pgCore.real('quantity').notNull().default(1),
    total: pgCore.real('total').notNull().default(0),
    status: pgCore.text('status').$type<EXPENSE_STATUS_ENUM>().default(EXPENSE_STATUS_ENUM.PENDING),
  },
  sqlite: {
    wishlistId: sqliteCore.text('wishlist_id'),
    incomeId: sqliteCore.text('income_id'),
    categoryId: sqliteCore.text('category_id'),
    description: sqliteCore.text('description'),
    estimatedDate: sqliteCore.integer('estimated_date', { mode: 'timestamp' }),
    priority: sqliteCore.integer().$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
    type: sqliteCore
      .text('type')
      .$type<RECURRENCE_TYPE_ENUM>()
      .default(RECURRENCE_TYPE_ENUM.UNIQUE),
    recurrence: sqliteCore.integer('recurrence'),
    startDate: sqliteCore.integer('start_date', { mode: 'timestamp' }),
    endDate: sqliteCore.integer('end_date', { mode: 'timestamp' }),
    estimatedAmount: sqliteCore.real('estimated_amount').notNull().default(0.0),
    quantity: sqliteCore.real('quantity').notNull().default(1),
    total: sqliteCore.real('total').notNull().default(0),
    status: sqliteCore
      .text('status')
      .$type<EXPENSE_STATUS_ENUM>()
      .default(EXPENSE_STATUS_ENUM.PENDING),
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

export const expense = schema[databaseConfig.driver];

const expensePriceTableName = 'expenses_prices';
const expensePRicSchema = {
  pglite: pgCore.pgTable(expensePriceTableName, {
    locationId: pgCore.text('location_id').notNull(),
    expenseId: pgCore.text('expense_id').notNull(),
    amount: pgCore.decimal('amount').notNull(),
  }),
  sqlite: sqliteCore.sqliteTable(expensePriceTableName, {
    locationId: sqliteCore.text('location_id').notNull(),
    expenseId: sqliteCore.text('expense_id').notNull(),
    amount: sqliteCore.real('amount').notNull(),
  }),
};

export const expensePrice = expensePRicSchema[databaseConfig.driver];
