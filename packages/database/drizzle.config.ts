import type { Config } from 'drizzle-kit';
import { DATABASE_NAME } from './src/database/connection';

const config = (driver: 'expo' | 'pglite'): Config => {
  const config = {
    expo: {
      driver: 'expo' as const,
      dialect: 'sqlite' as const,
    },
    pglite: {
      driver: 'pglite' as const,
      dialect: 'postgresql' as const,
      dbCredentials: {
        url: `/${DATABASE_NAME}`,
      },
    },
  }[driver];

  return {
    ...config,
    schema: '../../packages/database/src/schemas/*',
    out: `../../packages/database/drizzle/${driver}`,
    casing: 'camelCase',
  };
};

export { config };
