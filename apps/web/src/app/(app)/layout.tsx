import { AppLayout } from '@/components/layouts/app';
import { SettingsProvider } from '@repo/database/contexts/settings';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <AppLayout>
      <SettingsProvider>{children}</SettingsProvider>
    </AppLayout>
  );
}
