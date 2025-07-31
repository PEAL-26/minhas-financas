import { AuthProvider } from '@/contexts/auth';
import { DatabaseProvider } from '@repo/database/contexts/database';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DatabaseProvider driver="firebase" env="test">
        {children}
      </DatabaseProvider>
    </AuthProvider>
  );
}
