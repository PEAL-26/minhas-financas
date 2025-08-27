import { appConfig } from '@/configs/app';
import { firebaseConfig } from '@/configs/firebase';
import { DatabaseProvider } from '@repo/database/contexts/database';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode, Suspense } from 'react';
import { LoadingProvider } from './loading';

export function AppProviders({ children }: { children: ReactNode }) {
  const { env, connectionType, databaseDriver } = appConfig;

  return (
    <NuqsAdapter>
      <DatabaseProvider
        env={env}
        driver={databaseDriver}
        connectionType={connectionType}
        firebaseConfig={firebaseConfig}
        options={{ casing: 'snakeCase' }}
      >
        <Suspense>
          <LoadingProvider>{children}</LoadingProvider>
        </Suspense>
      </DatabaseProvider>
    </NuqsAdapter>
  );
}
