import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'wallets';

const fields = {
  pglite: {
    title: pgCore.text('title').notNull(),
    accountId: pgCore.text('account_id').notNull(),
    reference: pgCore.text('reference').notNull().unique(),
    iban: pgCore.text('iban').unique(),
    details: pgCore.text('details'),
    currencies: pgCore.json('currencies'), // [aoa, usd]
    active: pgCore.boolean('active').default(true),
  },
  sqlite: {
    title: sqliteCore.text('title').notNull(),
    accountId: sqliteCore.text('account_id').notNull(),
    reference: sqliteCore.text('reference').notNull().unique(),
    iban: sqliteCore.text('iban').unique(),
    details: sqliteCore.text('details'),
    currencies: sqliteCore.text('currencies', { mode: 'json' }), // [aoa, usd]
    active: sqliteCore.integer('active', { mode: 'boolean' }).default(true),
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

export const wallet = schema[databaseConfig.driver];
