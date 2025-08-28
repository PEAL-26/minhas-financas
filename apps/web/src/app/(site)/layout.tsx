import { SiteLayout } from '@/components/layouts/site';
import { TopLoader } from '@/components/ui/top-loader';
import { colors } from '@repo/ui/colors';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopLoader color={colors.primary.DEFAULT} />
      <SiteLayout>{children}</SiteLayout>
    </>
  );
}
