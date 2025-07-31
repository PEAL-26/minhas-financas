import { Metadata } from 'next';

import { PageLayout } from '@/components/layouts/page';

export const metadata: Metadata = {
  title: 'Despesas',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)}>
      <></>
    </PageLayout>
  );
}
