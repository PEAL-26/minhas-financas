import { IdbFs, PGlite } from '@electric-sql/pglite';
import { appConfig } from '../configs/app';
import { DatabaseOptions, Driver, FirebaseConfig, IDatabase } from '../types';

export const DATABASE_NAME = 'minhas-financas';

export async function firebaseConnection(firebaseConfig: any) {
  const { DatabaseFirebase } = await import('../drivers/firebase');
  return new DatabaseFirebase(firebaseConfig) as IDatabase;
}

export async function pgliteConnection(options?: DatabaseOptions) {
  try {
    const { DatabasePGLite } = await import('../drivers/pglite');

    const connection = await PGlite.create({
      fs: new IdbFs(DATABASE_NAME),
      relaxedDurability: true,
      debug: appConfig.env === 'development' ? 5 : 0,
    });

    return new DatabasePGLite(connection, options) as IDatabase;
  } catch (error) {
    console.error(error);
  }
}

export async function sqliteConnection() {
  // const sqlite = await import('drizzle-orm/expo-sqlite');
  // const expoSqlite = await import('expo-sqlite');
  // const { DatabaseSQLite } = await import('./sqlite');
  //const connection = sqlite.drizzle(`${DATABASE_NAME}.db`);
  return; //new DatabaseSQLite(/*connection*/ {} as any) as IDatabase;
}

interface Config {
  driver: Driver;
  firebaseConfig?: FirebaseConfig;
  options?: DatabaseOptions;
}

export async function getConnection(configs: Config) {
  const { driver, firebaseConfig, options } = configs;

  if (driver === 'expo') {
    return sqliteConnection();
  }

  if (driver === 'pglite') {
    return pgliteConnection(options);
  }

  return firebaseConnection(firebaseConfig);
}
