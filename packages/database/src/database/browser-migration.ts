import { databaseConfig } from '../configs/database';

type Migration = { sql: string[]; bps: boolean; folderMillis: number; hash: string };

const createDrizzleMigrationsTable = `
CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"hash" text NOT NULL,
	"timestamp" bigint NOT NULL,
	CONSTRAINT "__drizzle_migrations_hash_unique" UNIQUE("hash")
);`;

export const applyBrowserMigrations = async (database: any) => {
  await database.sqlUnsafe(createDrizzleMigrationsTable);

  const migrations: { default: Migration[] } = await import(
    `../../drizzle/${databaseConfig.driver}/migrations.json`
  );

  for (const migration of migrations.default) {
    const [migrationHashInDb] = await database.query(
      `select hash from __drizzle_migrations where hash = '${migration.hash}'`,
    );

    if (migrationHashInDb) {
      console.log(`«${migration.hash}» already applied`);
      continue;
    }

    const migrationQueries = migration.sql.join('\n');
    await database.sqlUnsafe(migrationQueries);
    const result = await database.query(`
      INSERT INTO __drizzle_migrations (hash, timestamp) 
      VALUES ('${migration.hash}', '${Date.now()}')`);
  }
};
