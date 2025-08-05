'use client';

import { DataTable } from '@/components/ui/table/data';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { useDelete, useListPaginate } from '@repo/database/hooks/crud';
import { colorGenerate } from '@repo/helpers/color-generate';
import { Category } from '@repo/types/category';
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

  const remove = useDelete({ repositoryName: 'category', queryKey: ['categories'] });

  const listPaginate = useListPaginate<Category>({
    repositoryName: 'category',
    queryKey: ['categories'],
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
              title: 'Categorias',
              render: (item) => {
                return (
                  <div className="flex items-center gap-2">
                    <div
                      style={{ backgroundColor: item?.color || colorGenerate().rgb }}
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                    >
                      <IconComponent
                        name={(item?.icon as any) || 'tag'}
                        className="size-4 text-white"
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
        fn={remove.handle}
        onClose={() => setAlertDelete({ open: false })}
        open={alertDelete.open}
      />
    </>
  );
}
