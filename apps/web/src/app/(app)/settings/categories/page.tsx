import { ListCategoriesTemplate } from '@/components/templates/categories/list';
import { SETTINGS_MENUS } from '@repo/constants/menus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: SETTINGS_MENUS.CATEGORIES.title,
  description: SETTINGS_MENUS.CATEGORIES.description,
};

export default function Page() {
  return <ListCategoriesTemplate />;
}
