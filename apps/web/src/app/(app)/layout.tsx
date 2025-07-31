import { AppLayout } from '@/components/layouts/app';
import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
