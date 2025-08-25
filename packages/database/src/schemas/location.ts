import { LOCATION_TYPE_ENUM } from '@repo/types/location';

import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';
import { databaseConfig } from '../configs/database';
import * as columns from '../helpers/columns';

const tableName = 'locations';

const fields = {
  pglite: {
    name: pgCore.text('name').notNull(),
    type: pgCore.text('type').$type<LOCATION_TYPE_ENUM>().notNull(),
    country: pgCore.text('country'),
    province: pgCore.text('province'),
    city: pgCore.text('city'),
    address: pgCore.text('address'),
    coordinate: pgCore.json('coordinate'), // {latitude: 0, longitude: 0}
    contacts: pgCore.json('contacts'), // [contact1, contact2, ...]
  },
  sqlite: {
    name: sqliteCore.text('name').notNull(),
    type: sqliteCore.text('type').$type<LOCATION_TYPE_ENUM>().notNull(),
    country: sqliteCore.text('country'),
    province: sqliteCore.text('province'),
    city: sqliteCore.text('city'),
    address: sqliteCore.text('address'),
    coordinate: sqliteCore.text('coordinate', { mode: 'json' }), // {latitude: 0, longitude: 0}
    contacts: sqliteCore.text('contacts', { mode: 'json' }), // [contact1, contact2, ...]
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

export const location = schema[databaseConfig.driver];
