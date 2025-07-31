'use client';
import { AlertProvider } from '@/contexts/alert-context';
import { AuthProvider } from '@/contexts/auth-context';
import { ModalProvider } from '@/contexts/modal-context';
import { ThemeProvider } from '@/libs/material-tailwind';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AlertProvider>
            <ModalProvider>{children}</ModalProvider>
          </AlertProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
