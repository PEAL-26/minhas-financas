'use client';

import { useState } from 'react';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { Wishlist } from '@repo/types/wishlist';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { Badge } from '@repo/ui/badge';
import { showToastError } from '@repo/ui/helpers/toast';

import { CategoryComponent } from '@/components/ui/category-component';
import { PRIORITY_MAP } from '@repo/types/priority';
import {
  displayRecurrence,
  RECURRENCE_TYPE_ENUM,
  RECURRENCE_TYPE_MAP,
} from '@repo/types/recurrence';
import { WISHLIST_STATUS_MAP } from '@repo/types/status';
import { WishlistFormSheet } from '../form';

export function ListWishlistsTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const remove = useDelete({ repositoryName: 'wishlist', queryKey: ['wishlists'] });

  const listPaginate = useListPaginate<Wishlist>({
    repositoryName: 'wishlist',
    queryKey: ['wishlists'],
    query,
    size,
    page,
    setPage,
    setSize,
    onError: (error) => {
      showToastError(error);
    },
  });

  return (
    <>
      <div className="flex flex-col p-4">
        <DataTable
          response={listPaginate}
          fields={[
            {
              name: 'name',
              title: 'Necessidade',
              render: (item) => {
                return (
                  <CategoryComponent
                    title={item.name}
                    description={item?.category?.name}
                    backgroundColor={item?.category?.color}
                    icon={item?.category?.icon}
                  />
                );
              },
            },
            {
              name: 'type',
              title: 'Recorrência',
              render: (item) => {
                const typeDisplay = RECURRENCE_TYPE_MAP[item.type]?.display;

                if (item.type === RECURRENCE_TYPE_ENUM.UNIQUE) {
                  return typeDisplay;
                }

                return displayRecurrence(item.recurrence);
              },
            },
            {
              name: 'priority',
              title: 'Prioridade',
              render: (item) => {
                const priority = PRIORITY_MAP[item.priority];
                return (
                  <Badge style={{ backgroundColor: priority.color }}>{priority.display}</Badge>
                );
              },
            },
            {
              name: 'total',
              title: 'Montante',
            },
            {
              name: 'status',
              title: 'Estado',
              render: (item) => {
                const status = WISHLIST_STATUS_MAP[item.status];
                return <Badge style={{ backgroundColor: status.color }}>{status.display}</Badge>;
              },
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <WishlistFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a lista de desejos."
        id={alertDelete?.id}
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
