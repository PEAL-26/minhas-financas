import { appConfig } from '@/configs/app';
import { firebaseConfig } from '@/configs/firebase';
import { AuthProvider } from '@/contexts/auth';
import { DatabaseProvider } from '@repo/database/contexts/database';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const { env, connectionType, databaseDriver } = appConfig;

  return (
    <AuthProvider>
      <DatabaseProvider
        env={env}
        driver={databaseDriver}
        connectionType={connectionType}
        firebaseConfig={firebaseConfig}
      >
        {children}
      </DatabaseProvider>
    </AuthProvider>
  );
}
