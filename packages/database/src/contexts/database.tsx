'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { applyBrowserMigrations } from '../database/browser-migration';
import { getConnection } from '../database/connection';
import { DatabaseInMemory } from '../factories/database-factory';
import { QueryClientProvider } from '../providers/query-client';
import { DatabaseOptions, Driver, FirebaseConfig, IDatabase } from '../types';

interface DatabaseContextProps {
  getDatabase(): Promise<IDatabase>;
  isLoading: boolean;
  error: unknown | null;
}

type DatabaseProviderProps = {
  driver: Driver;
  children: ReactNode;
  connectionType?: 'IN_MEMORY' | 'DATABASE_ENGINE';
  env?: 'test' | 'development' | 'production';
  firebaseConfig?: FirebaseConfig;
  options?: DatabaseOptions;
};

const DatabaseContext = createContext<DatabaseContextProps>({} as DatabaseContextProps);

export function DatabaseProvider(props: DatabaseProviderProps) {
  const [database, setDatabase] = useState<IDatabase | null>(null);
  const {
    driver,
    children,
    connectionType = 'DATABASE_ENGINE',
    firebaseConfig,
    options,
  } = props || {};
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown | null>(null);

  const getDatabase = async () => {
    let db = null;

    if (database) return database;

    if (connectionType === 'IN_MEMORY') {
      db = new DatabaseInMemory() as IDatabase;
    }

    if (connectionType === 'DATABASE_ENGINE') {
      db = await getConnection({ driver, firebaseConfig, options });
    }

    if (!db) throw new Error('Database not defined');

    return db;
  };

  const handleBackup = () => {};

  const handleRestore = () => {};

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        let db = database;

        if (!database) {
          db = await getDatabase();
          setDatabase(db);
        }

        if (db) {
          await applyBrowserMigrations(db);
        }
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <DatabaseContext.Provider value={{ getDatabase, isLoading, error }}>
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
