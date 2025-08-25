import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { INCOME_STATUS_ENUM } from '@repo/types/status';

import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'incomes';

const fields = {
  pglite: {
    walletId: pgCore.text('wallet_id'),
    description: pgCore.text('description'),
    amount: pgCore.real('amount').notNull().default(0.0),
    type: pgCore.text().$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE),
    recurrence: pgCore.integer('recurrence'),
    duration: pgCore.integer('duration'),
    startDate: pgCore.timestamp('start_date'),
    endDate: pgCore.timestamp('end_date'),
    currency: pgCore.varchar('currency', { length: 3 }),
    estimatedDateReceipt: pgCore.timestamp('estimated_date_receipt'),
    status: pgCore.text().$type<INCOME_STATUS_ENUM>().default(INCOME_STATUS_ENUM.PENDING),
  },
  sqlite: {
    walletId: sqliteCore.text('wallet_id'),
    description: sqliteCore.text('description'),
    amount: sqliteCore.real('amount').notNull().default(0.0),
    type: sqliteCore.text().$type<RECURRENCE_TYPE_ENUM>().default(RECURRENCE_TYPE_ENUM.UNIQUE),
    recurrence: sqliteCore.integer('recurrence'),
    duration: sqliteCore.integer('duration'),
    startDate: sqliteCore.integer('start_date', { mode: 'timestamp' }),
    endDate: sqliteCore.integer('end_date', { mode: 'timestamp' }),
    currency: sqliteCore.text('currency', { length: 3 }),
    estimatedDateReceipt: sqliteCore.integer('estimated_date_receipt', { mode: 'timestamp' }),
    status: sqliteCore.text().$type<INCOME_STATUS_ENUM>().default(INCOME_STATUS_ENUM.PENDING),
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

export const income = schema[databaseConfig.driver];
