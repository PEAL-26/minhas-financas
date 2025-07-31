import * as drizzleExpoSqlite from 'drizzle-orm/expo-sqlite';
import * as expoSqlite from 'expo-sqlite';

import { DatabaseSQLite } from './sqlite';

const DATABASE_NAME = 'minhas_financas.db';

const openDatabase = expoSqlite.openDatabaseSync(DATABASE_NAME);
const connectionDrizzle = drizzleExpoSqlite.drizzle(openDatabase);

const db = new DatabaseSQLite(openDatabase);

export { DATABASE_NAME, connectionDrizzle, db, openDatabase };
