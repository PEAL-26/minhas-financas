import { PageLayout } from '@/components/layouts/page';
import { ListCategoriesTemplate } from '@/components/templates/categories/list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configurações',
  description: '',
};

export default function Page() {
  return (
    <PageLayout title={String(metadata.title)}>
      Listar as categorias e contas
      <></>
      <ListCategoriesTemplate />
    </PageLayout>
  );
}
