'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { firebaseConfig } from '../configs/firebase';
import { DatabaseInMemory } from '../factories/database-factory';
import { QueryClientProvider } from '../providers/query-client';
import { IDatabase } from '../types';

interface DatabaseContextProps {
  getDatabase(): IDatabase;
}

declare const drivers: readonly ['expo', 'pglite', 'firebase'];
type Driver = (typeof drivers)[number];

type DatabaseProviderProps = {
  driver: Driver;
  children: ReactNode;
  connectionType?: 'IN_MEMORY' | 'DATABASE_ENGINE';
  env?: 'test' | 'development' | 'production';
  firebaseConfig?: typeof firebaseConfig;
};

const DatabaseContext = createContext<DatabaseContextProps>({} as DatabaseContextProps);

export function DatabaseProvider(props: DatabaseProviderProps) {
  const [database, setDatabase] = useState<IDatabase | null>(null);
  const { driver, children, connectionType = 'DATABASE_ENGINE', firebaseConfig } = props || {};

  const getDatabase = () => {
    let db = null;

    if (database) return database;

    if (connectionType === 'IN_MEMORY') {
      db = new DatabaseInMemory();
    }

    if (connectionType === 'DATABASE_ENGINE') {
      if (driver === 'expo') {
        const { DatabaseSQLite } = require('../drivers/sqlite');
        db = new DatabaseSQLite();
      }

      if (driver === 'firebase') {
        const { DatabaseFirebase } = require('../drivers/firebase');
        db = new DatabaseFirebase(firebaseConfig);
      }

      if (driver === 'pglite') {
        const { DatabasePGLite } = require('../drivers/pglite');
        db = new DatabasePGLite();
      }
    }

    if (!db) throw new Error('Database not defined');

    return db;
  };

  useEffect(() => {
    if (!database) {
      const db = getDatabase();
      setDatabase(db);
    }
  }, []);

  return (
    <DatabaseContext.Provider value={{ getDatabase }}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </DatabaseContext.Provider>
  );
}

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error('useDatabaseContext deve ser usado dentro do DatabaseProvider.');
  }

  return context;
};
