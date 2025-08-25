import { Metadata } from 'next';

import { PageLayout } from '@/components/layouts/page';
import { ListExpensesActions } from '@/components/templates/expenses/actions';
import { ListExpensesTemplate } from '@/components/templates/expenses/list';
import { MAIN_MENUS } from '@repo/constants/menus';

export const metadata: Metadata = {
  title: MAIN_MENUS.EXPENSES.title,
  description: MAIN_MENUS.EXPENSES.description,
};

export default function Page() {
  return (
    <PageLayout
      title={String(metadata.title)}
      description={String(metadata?.description || '')}
      actions={<ListExpensesActions />}
    >
      <ListExpensesTemplate />
    </PageLayout>
  );
}
