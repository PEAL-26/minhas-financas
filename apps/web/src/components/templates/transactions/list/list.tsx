'use client';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { formatDate } from '@repo/helpers/date';
import { Transaction } from '@repo/types/transaction';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { useState } from 'react';
import { TransactionFormSheet } from '../form';

export function ListTransactionsTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'transaction', queryKey: ['transactions'] });

  const listPaginate = useListPaginate<Transaction>({
    repositoryName: 'transaction',
    queryKey: ['transactions'],
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
              name: 'type',
              title: 'Tipo',
            },
            {
              name: 'date',
              title: 'Data',
              render: (item) => (item.date ? formatDate(item.date) : 'S/N'),
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <TransactionFormSheet
        onClose={() => setForm({ open: false })}
        open={form.open}
        id={form.id}
      />
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
