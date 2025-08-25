import { ACCOUNT_TYPE_ENUM } from '@repo/types/account';
import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'accounts';

const fields = {
  pglite: {
    name: pgCore.text('name').notNull(),
    type: pgCore.text().$type<ACCOUNT_TYPE_ENUM>().notNull(),
    currencies: pgCore.json('currencies'), // [aoa, usd]
    siteUrl: pgCore.text('site_url'),
    swiftCode: pgCore.text('swift_code'),
  },
  sqlite: {
    name: sqliteCore.text('name').notNull(),
    type: sqliteCore.text().$type<ACCOUNT_TYPE_ENUM>().notNull(),
    currencies: sqliteCore.text('currencies', { mode: 'json' }), // [aoa, usd]
    siteUrl: sqliteCore.text('site_url'),
    swiftCode: sqliteCore.text('swift_code'),
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

export const account = schema[databaseConfig.driver];
