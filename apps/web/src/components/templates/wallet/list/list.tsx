'use client';
import { useState } from 'react';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { Wallet } from '@repo/types/wallet';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';

import { WalletFormSheet } from '../form';

export function ListWalletsTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'wallet', queryKey: ['wallets'] });

  const listPaginate = useListPaginate<Wallet>({
    repositoryName: 'wallet',
    queryKey: ['wallets'],
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
              name: 'title',
              title: 'Carteira',
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <WalletFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a carteira."
        id={alertDelete?.id}
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
