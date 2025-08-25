import { AppProviders } from '@/providers';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return <AppProviders>{children}</AppProviders>;
}
