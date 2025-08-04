'use client';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDeleteCategory, useListPaginationCategory } from '@repo/database/hooks/category';
import { colorGenerate } from '@repo/helpers/color-generate';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { IconComponent } from '@repo/ui/icon-component';
import { useState } from 'react';
import { CategoryFormSheet } from '../form';

export function ListCategoriesTemplate() {
  const [page, setPage] = useQueryStateParams<number>('page', 'int');
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const [query] = useQueryStateParams('q');

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const response = useListPaginationCategory({ size: size ?? 10, page, setPage, setSize, query });
  const categoryDelete = useDeleteCategory();

  return (
    <>
      <div className="flex flex-col p-4">
        <DataTable
          response={response}
          fields={[
            {
              name: 'name',
              title: 'Categorias',
              render: (item) => {
                return (
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: item?.color || colorGenerate().rgb }}
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                    >
                      <IconComponent
                        name={item?.icon || 'AArrowDown'}
                        className="size-5 text-white"
                      />
                    </div>
                    <span>{item.name}</span>
                  </div>
                );
              },
            },
          ]}
          onEdit={(item) => setForm({ id: item.id, open: true })}
          onDelete={(id) => setAlertDelete({ open: true, id })}
        />
      </div>

      <CategoryFormSheet onClose={() => setForm({ open: false })} open={form.open} id={form.id} />
      <AlertDialogCustom
        description="Esta ação não pode ser desfeita. Isso excluirá permanentemente a categoria."
        id={alertDelete?.id}
        fn={categoryDelete.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
