import { sql } from 'drizzle-orm';
import * as pgCore from 'drizzle-orm/pg-core';
import * as sqliteCore from 'drizzle-orm/sqlite-core';

export const primaryKey = {
  pglite: { id: pgCore.text('id').primaryKey() },
  sqlite: { id: sqliteCore.text('id').primaryKey().unique() },
};

export const timestamps = {
  pglite: {
    updated_at: pgCore.timestamp("updated_at"),
    created_at: pgCore.timestamp("created_at").defaultNow().notNull(),
  },
  sqlite: {
    createdAt: sqliteCore
      .integer('created_at', { mode: 'timestamp' })
      .default(sql`current_timestamp`),
    updatedAt: sqliteCore
      .integer('updated_at', { mode: 'timestamp' })
      .default(sql`current_timestamp`),
  },
};
