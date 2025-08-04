import { PageLayout } from '@/components/layouts/page';
import { MAIN_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: MAIN_MENUS.INCOMES.title,
  description: MAIN_MENUS.INCOMES.description,
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)} description={String(metadata?.description || '')}>
      <></>
    </PageLayout>
  );
}
