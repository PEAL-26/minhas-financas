import { PageLayout } from '@/components/layouts/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rendas',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)}>
      <></>
    </PageLayout>
  );
}
