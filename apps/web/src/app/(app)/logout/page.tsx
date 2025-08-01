import { PageLayout } from '@/components/layouts/page';
import { LogoutComponent } from '@/components/ui/logout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logout',
  description: '',
};

export default function Page() {
  return (
    <PageLayout classNameContent="">
      <LogoutComponent />
    </PageLayout>
  );
}
