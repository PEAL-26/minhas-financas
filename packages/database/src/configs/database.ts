let driver = (process.env.NEXT_PUBLIC_DATABASE_DRIVER as 'sqlite' | 'pglite' | 'expo') || 'pglite';

if (driver === 'expo') {
  driver = 'sqlite';
}

export const databaseConfig = { driver };
