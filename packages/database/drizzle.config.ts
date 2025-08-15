import type { Config } from 'drizzle-kit';

const config = (driver: 'expo' | 'pglite'): Config => {
  const config = {
    expo: {
      driver: 'expo' as const,
      dialect: 'sqlite' as const,
    },
    pglite: {
      driver: 'pglite' as const,
      dialect: 'postgresql' as const,
    },
  }[driver];

  return {
    ...config,
    schema: '../../packages/database/src/schemas/*',
    out: `../../packages/database/src/schemas/drizzle/${driver}`,
    casing: 'camelCase',
  };
};

export { config };
