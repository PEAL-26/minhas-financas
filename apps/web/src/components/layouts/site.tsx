'use client';
import { Footer } from '@/components/ui/footer';
import { HeaderMain } from '@/components/ui/header';
import { useAuthContext } from '@repo/database/contexts/auth';
import { Loading } from '@repo/ui/loading';
import { ReactNode } from 'react';

export function SiteLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useAuthContext();

  return (
    <>
      <div className="flex flex-1 flex-col bg-white">
        <HeaderMain />
        {children}
        <Footer />
      </div>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loading />
        </div>
      )}
    </>
  );
}
