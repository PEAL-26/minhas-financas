'use client';
import { useDatabaseContext } from '@repo/database/contexts/database';
import { colors } from '@repo/ui/colors';
import { TriangleAlertIcon } from '@repo/ui/lib/lucide';
import { Loading } from '@repo/ui/loading';
import { ReactNode } from 'react';

export function LoadingProvider({ children }: { children: ReactNode }) {
  const { isLoading, error } = useDatabaseContext();

  if (isLoading && !error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loading color={colors.primary.DEFAULT} />
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex max-w-md flex-col items-center justify-center gap-3 text-center">
          <TriangleAlertIcon className="size-20 text-red-500" />
          <span className="text-lg text-red-500">
            Oops! Algo deu errado ao iniciar a base de dados.
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
