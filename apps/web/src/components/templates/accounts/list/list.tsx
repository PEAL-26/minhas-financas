'use client';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { ACCOUNT_TYPE_ENUM_MAP, Account } from '@repo/types/account';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { IconComponent } from '@repo/ui/icon-component';
import Link from 'next/link';
import { useState } from 'react';
import { AccountFormSheet } from '../form';

export function ListAccountsTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'account', queryKey: ['accounts'] });

  const listPaginate = useListPaginate<Account>({
    repositoryName: 'account',
    queryKey: ['accounts'],
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
              name: 'name',
              title: 'Conta',
              render: (item) => {
                const type = ACCOUNT_TYPE_ENUM_MAP[item.type];
                return (
                  <div style={{ backgroundColor: type.color }} className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                      <IconComponent name={type.icon as any} className="size-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-black">{item.name}</span>
                      <span className="text-xs text-gray-400">{type.display}</span>
                    </div>
                  </div>
                );
              },
            },
            {
              name: 'currencies',
              title: 'Moedas',
            },
            {
              name: 'siteUrl',
              title: 'Site',
              render: (item) => {
                return item?.siteUrl ? (
                  <Link
                    target="_blank"
                    className="text-sm text-blue-600 hover:underline"
                    href={item.siteUrl}
                  >
                    {item.siteUrl}
                  </Link>
                ) : null;
              },
            },
            {
              name: 'swiftCode',
              title: 'Código Swift',
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <AccountFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a conta."
        id={alertDelete?.id}
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
