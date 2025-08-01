import { ListCategoriesTemplate } from '@/components/templates/categories/list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categorias | Configurações',
  description: '',
};

export default function Page() {
  return <ListCategoriesTemplate />;
}
