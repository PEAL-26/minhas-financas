import { PRIORITY_ENUM } from '@repo/types/priority';
import { RECURRENCE_TYPE_ENUM } from '@repo/types/recurrence';
import { WISHLIST_STATUS_ENUM } from '@repo/types/status';

import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'wishlist';

const fields = {
  pglite: {
    name: pgCore.text('name').notNull(),
    type: pgCore
      .text()
      .$type<RECURRENCE_TYPE_ENUM>()
      .default(RECURRENCE_TYPE_ENUM.UNIQUE)
      .notNull(),
    recurrence: pgCore.integer('recurrence'),
    categoryId: pgCore.text('category_id'),
    targetDate: pgCore.timestamp('target_date'),
    priority: pgCore.integer('priority').$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
    expectedLocationId: pgCore.text('expected_location_id'),
    estimatedCost: pgCore.real('estimated_cost'),
    quantity: pgCore.real('quantity'),
    total: pgCore.real('total'),
    status: pgCore
      .text('status')
      .$type<WISHLIST_STATUS_ENUM>()
      .default(WISHLIST_STATUS_ENUM.PENDING),
  },
  sqlite: {
    name: sqliteCore.text('name').notNull(),
    type: sqliteCore
      .text()
      .$type<RECURRENCE_TYPE_ENUM>()
      .default(RECURRENCE_TYPE_ENUM.UNIQUE)
      .notNull(),
    recurrence: sqliteCore.integer('recurrence'),
    categoryId: sqliteCore.text('category_id'),
    targetDate: sqliteCore.integer('target_date', { mode: 'timestamp' }),
    priority: sqliteCore.integer('priority').$type<PRIORITY_ENUM>().default(PRIORITY_ENUM.NORMAL),
    expectedLocationId: sqliteCore.text('expected_location_id'),
    estimatedCost: sqliteCore.real('estimated_cost'),
    quantity: sqliteCore.real('quantity'),
    total: sqliteCore.real('total'),
    status: sqliteCore
      .text('status')
      .$type<WISHLIST_STATUS_ENUM>()
      .default(WISHLIST_STATUS_ENUM.PENDING),
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

export const wishlist = schema[databaseConfig.driver];

const wishlistPriceTableName = 'wishlist_prices';
const wishlistPriceSchema = {
  sqlite: sqliteCore.sqliteTable(wishlistPriceTableName, {
    wishlistId: sqliteCore.text('wishlist_id'),
    locationId: sqliteCore.text('location_id'),
    amount: sqliteCore.real('amount').notNull(),
  }),
  pglite: pgCore.pgTable(wishlistPriceTableName, {
    wishlistId: pgCore.text('wishlist_id'),
    locationId: pgCore.text('location_id'),
    amount: pgCore.real('amount').notNull(),
  }),
};

export const wishlistPrice = wishlistPriceSchema[databaseConfig.driver];
