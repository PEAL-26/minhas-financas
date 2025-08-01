type ConnectionType = 'IN_MEMORY' | 'DATABASE_ENGINE';
type Driver = 'expo' | 'pglite' | 'firebase';

export const appConfig = {
  env: process.env.NODE_ENV ?? 'development',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  connectionType: (process.env.NEXT_PUBLIC_DATABASE_CONNECTION_TYPE ??
    'IN_MEMORY') as ConnectionType,
  databaseDriver: (process.env.NEXT_PUBLIC_DATABASE_DRIVER ?? 'pglite') as Driver,
};
