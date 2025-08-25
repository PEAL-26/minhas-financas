import { readMigrationFiles } from 'drizzle-orm/migrator';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { databaseConfig } from '../configs/database';

const migrations = readMigrationFiles({
  migrationsFolder: path.join(__dirname, '..', '..', 'drizzle', databaseConfig.driver),
});

(async () => {
  const migrationsFile = path.join(
    __dirname,
    '..',
    '..',
    'drizzle',
    databaseConfig.driver,
    'migrations.json',
  );

  fs.writeFileSync(migrationsFile, JSON.stringify(migrations));
})();

console.log('Migrations compiled!');
