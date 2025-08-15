'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { getConnection } from '../drivers/connection';
import { DatabaseInMemory } from '../factories/database-factory';
import { QueryClientProvider } from '../providers/query-client';
import { Driver, FirebaseConfig, IDatabase } from '../types';

interface DatabaseContextProps {
  getDatabase(): Promise<IDatabase>;
}

type DatabaseProviderProps = {
  driver: Driver;
  children: ReactNode;
  connectionType?: 'IN_MEMORY' | 'DATABASE_ENGINE';
  env?: 'test' | 'development' | 'production';
  firebaseConfig?: FirebaseConfig;
};

const DatabaseContext = createContext<DatabaseContextProps>({} as DatabaseContextProps);

export function DatabaseProvider(props: DatabaseProviderProps) {
  const [database, setDatabase] = useState<IDatabase | null>(null);
  const { driver, children, connectionType = 'DATABASE_ENGINE', firebaseConfig } = props || {};

  const getDatabase = async () => {
    let db = null;

    if (database) return database;

    if (connectionType === 'IN_MEMORY') {
      db = new DatabaseInMemory() as IDatabase;
    }

    if (connectionType === 'DATABASE_ENGINE') {
      db = await getConnection({ driver, firebaseConfig });

      console.log({ db });
    }

    if (!db) throw new Error('Database not defined');

    return db;
  };

  const handleBackup = () => {};

  const handleRestore = () => {};

  useEffect(() => {
    (async () => {
      if (!database) {
        const db = await getDatabase();
        setDatabase(db);
      }
    })();
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
