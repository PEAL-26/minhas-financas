import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'users';

const fields = {
  pglite: {
    name: pgCore.text('name').notNull(),
    email: pgCore.text('email').notNull(),
    passwordHash: pgCore.text('password_hash'),
    providerId: pgCore.text('provider_id'),
  },
  sqlite: {
    name: sqliteCore.text('name').notNull(),
    email: sqliteCore.text('email').notNull(),
    passwordHash: sqliteCore.text('password_hash'),
    providerId: sqliteCore.text('provider_id'),
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

export const user = schema[databaseConfig.driver];
