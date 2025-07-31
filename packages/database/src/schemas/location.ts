import { LOCATION_TYPE_ENUM } from '@repo/types';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const location = sqliteTable('locations', {
  id: text('id').primaryKey().unique(),
  name: text('name').notNull(),
  type: text('type').$type<LOCATION_TYPE_ENUM>().notNull(),
  province: text('province'),
  city: text('city'),
  address: text('address'),
  coordinate: text('coordinate', { mode: 'json' }), // {latitude: 0, longitude: 0}
  contacts: text('contacts', { mode: 'json' }), // [contact1, contact2, ...]
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`current_timestamp`),
});
