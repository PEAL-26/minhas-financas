'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { firebaseConfig } from '../configs/firebase';
import { DatabaseInMemory } from '../factories/database-factory';
import { IDatabase, Verify } from '../types';

interface DatabaseContextProps {
  getDatabase(): IDatabase;
}

declare const drivers: readonly ['expo', 'pglite', 'firebase'];
type Driver = (typeof drivers)[number];

type DatabaseProviderProps = {
  children: ReactNode;
  env?: 'test' | 'development' | 'production';
} & (
  | {
      driver: Driver;
    }
  | {
      driver: Verify<Driver, 'firebase'>;
      firebaseConfig: typeof firebaseConfig;
      children: ReactNode;
    }
);

const DatabaseContext = createContext<DatabaseContextProps>({} as DatabaseContextProps);

export function DatabaseProvider(props: DatabaseProviderProps) {
  const [database, setDatabase] = useState<IDatabase | null>(null);
  const { driver, children, env } = props;

  if (driver === 'firebase') {
  }

  useEffect(() => {
    if (!database) {
      const db = getDatabase();
      setDatabase(db);
    }
  }, []);

  const getDatabase = () => {
    let db = null;

    if (database) return database;

    if (env === 'test') {
      db = new DatabaseInMemory();
    }

    if (!db) throw new Error('Database not defined');

    return db;
  };

  return <DatabaseContext.Provider value={{ getDatabase }}>{children}</DatabaseContext.Provider>;
}

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error('useDatabaseContext deve ser usado dentro do DatabaseProvider.');
  }

  return context;
};
