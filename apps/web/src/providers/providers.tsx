import { appConfig } from '@/configs/app';
import { firebaseConfig } from '@/configs/firebase';
import { AuthProvider } from '@repo/database/contexts/auth';
import { DatabaseProvider } from '@repo/database/contexts/database';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactNode, Suspense } from 'react';
import { LoadingProvider } from './loading';

export function Providers({ children }: { children: ReactNode }) {
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
        <AuthProvider platform="web">
          <Suspense>
            <LoadingProvider>{children}</LoadingProvider>
          </Suspense>
        </AuthProvider>
      </DatabaseProvider>
    </NuqsAdapter>
  );
}
