'use client';
import * as Tanstack from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new Tanstack.QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <Tanstack.QueryClientProvider client={queryClient}>{children}</Tanstack.QueryClientProvider>
  );
}
