import { AlertProvider } from '@/contexts/alert-context';
import { AuthProvider } from '@/contexts/auth';
import { ReactNode } from 'react';
import { QueryClientProvider } from './query-client';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider>
        <AlertProvider>
          {children}
          {/* <ModalProvider>{children}</ModalProvider> */}
        </AlertProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
