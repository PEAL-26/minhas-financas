import { TopLoader } from '@/components/ui/top-loader';
import { AppProviders } from '@/providers';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <>
      <TopLoader />
      <AppProviders>{children}</AppProviders>
    </>
  );
}
