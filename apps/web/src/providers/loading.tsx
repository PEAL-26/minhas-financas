'use client';
import { useDatabaseContext } from '@repo/database/contexts/database';
import { Loading } from '@repo/ui/loading';
import { ReactNode } from 'react';

export function LoadingProvider({ children }: { children: ReactNode }) {
  const { isLoading } = useDatabaseContext();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading color="#fff" />
      </div>
    );
  }

  return <>{children}</>;
}
