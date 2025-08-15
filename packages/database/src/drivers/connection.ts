import { Driver, FirebaseConfig, IDatabase } from '../types';

const DATABASE_NAME = 'minhas_financas';

export async function firebaseConnection(firebaseConfig: any) {
  const { DatabaseFirebase } = await import('./firebase');
  return new DatabaseFirebase(firebaseConfig) as IDatabase;
}

export async function pgliteConnection() {
  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle } = await import('drizzle-orm/pglite');
  const { DatabasePGLite } = await import('./pglite');
  const client = new PGlite(`idb://${DATABASE_NAME}`);
  const connection = drizzle({ client });
  return new DatabasePGLite(connection as any) as IDatabase;
}

export async function sqliteConnection() {
  // const sqlite = await import('drizzle-orm/expo-sqlite');
  // const expoSqlite = await import('expo-sqlite');
  const { DatabaseSQLite } = await import('./sqlite');
  //const connection = sqlite.drizzle(`${DATABASE_NAME}.db`);
  return new DatabaseSQLite(/*connection*/ {} as any) as IDatabase;
}

interface Options {
  driver: Driver;
  firebaseConfig?: FirebaseConfig;
}

export async function getConnection(options: Options) {
  const { driver, firebaseConfig } = options;
  if (driver === 'expo') {
    return sqliteConnection();
  }

  if (driver === 'pglite') {
    return pgliteConnection();
  }

  return firebaseConnection(firebaseConfig);
}
