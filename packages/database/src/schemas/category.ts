import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'categories';

const fields = {
  pglite: {
    name: pgCore.text('name').notNull(),
    icon: pgCore.text('icon'),
    color: pgCore.text('color'),
  },
  sqlite: {
    name: sqliteCore.text('name').notNull(),
    icon: sqliteCore.text('icon'),
    color: sqliteCore.text('color'),
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

export const category = schema[databaseConfig.driver];
