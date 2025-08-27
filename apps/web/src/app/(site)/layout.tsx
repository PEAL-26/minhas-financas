import { SiteLayout } from '@/components/layouts/site';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteLayout>{children}</SiteLayout>;
}
