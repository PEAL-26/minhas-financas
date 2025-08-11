'use client';

import { CategoryComponent } from '@/components/ui/category-component';
import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { ACCOUNT_TYPE_MAP } from '@repo/types/account';
import { Income } from '@repo/types/income';
import { INCOME_STATUS_MAP } from '@repo/types/status';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { Badge } from '@repo/ui/badge';
import { useState } from 'react';
import { IncomeFormSheet } from '../form';

export function ListIncomesTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'income', queryKey: ['incomes'] });

  const listPaginate = useListPaginate<Income>({
    repositoryName: 'income',
    queryKey: ['incomes'],
    query,
    size,
    page,
    setPage,
    setSize,
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="flex flex-col p-4">
        <DataTable
          response={listPaginate}
          fields={[
            {
              name: 'description',
              title: 'Renda',
              render: (item) => {
                const account = item?.wallet?.account;
                const accountType =
                  ACCOUNT_TYPE_MAP?.[account?.type as keyof typeof ACCOUNT_TYPE_MAP];
                const icon = accountType?.icon || 'wallet';
                const color = accountType?.color || 'black';

                return (
                  <CategoryComponent
                    title={item.description || ''}
                    description={`${accountType?.display ? `${accountType.display} |` : ''} ${item.wallet?.title || ''}`}
                    backgroundColor="transparent"
                    borderColor={color}
                    color={color}
                    icon={icon}
                  />
                );
              },
            },
            {
              name: 'status',
              title: 'Estado',
              render: (item) => {
                const status = INCOME_STATUS_MAP[item.status];
                return <Badge style={{ backgroundColor: status.color }}>{status.display}</Badge>;
              },
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <IncomeFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
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
