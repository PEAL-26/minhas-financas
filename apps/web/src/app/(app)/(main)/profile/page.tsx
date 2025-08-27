import { PageLayout } from '@/components/layouts/page';
import { ProfileTemplate } from '@/components/templates/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Perfil',
};

export default function Page() {
  return (
    <PageLayout
      title={String(metadata.title)}
      description="Gerencie suas informações pessoais e configurações de conta"
      contentClassName="gap-6"
    >
      <ProfileTemplate />
    </PageLayout>
  );
}
