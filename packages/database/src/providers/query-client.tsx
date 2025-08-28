'use client';
import * as Tanstack from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new Tanstack.QueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <Tanstack.QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </Tanstack.QueryClientProvider>
  );
}
