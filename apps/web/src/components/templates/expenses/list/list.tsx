'use client';

import { CategoryComponent } from '@/components/ui/category-component';
import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { formatCurrency } from '@repo/helpers/currency';
import { formatDate } from '@repo/helpers/date';
import { Expense } from '@repo/types/expense';
import { EXPENSE_STATUS_MAP } from '@repo/types/status';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { Badge } from '@repo/ui/badge';
import { useState } from 'react';
import { ExpenseFormSheet } from '../form';

export function ListExpensesTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'expense', queryKey: ['expenses'] });

  const listPaginate = useListPaginate<Expense>({
    repositoryName: 'expense',
    queryKey: ['expenses'],
    query,
    size,
    page,
    setPage,
    setSize,
  });

  return (
    <>
      <div className="flex flex-col p-4">
        <DataTable
          response={listPaginate}
          fields={[
            {
              name: 'description',
              title: 'Despesa',
              render: (item) => {
                return (
                  <CategoryComponent
                    title={item?.description || 'Desconhecido'}
                    description={item?.category?.name}
                    backgroundColor={item?.category?.color}
                    icon={item?.category?.icon}
                  />
                );
              },
            },
            {
              name: 'estimatedDate',
              title: 'Data',
              render: (item) => (item.estimatedDate ? formatDate(item.estimatedDate) : 'S/N'),
            },
            {
              name: 'estimatedAmount',
              title: 'Montante',
              render: (item) =>
                item.estimatedAmount ? formatCurrency(item.estimatedAmount) : 'S/N',
            },
            {
              name: 'status',
              title: 'Estado',
              render: (item) => {
                const status = EXPENSE_STATUS_MAP[item.status];
                return <Badge style={{ backgroundColor: status.color }}>{status.display}</Badge>;
              },
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <ExpenseFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a despesa."
        id={alertDelete?.id}
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
