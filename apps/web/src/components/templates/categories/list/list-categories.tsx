'use client';

import { DataTable } from '@/components/ui/table/data';
import { useDeleteCategory, useListPaginationCategory } from '@repo/database/hooks/category';
import { colorGenerate } from '@repo/helpers/color-generate';
import { AlertDialogCustom } from '@repo/ui/alert-dialog-custom';
import { Button } from '@repo/ui/button';
import { IconComponent } from '@repo/ui/icon-component';
import { EditIcon, TrashIcon } from '@repo/ui/lib/lucide';
import { useState } from 'react';
import { CategoryFormSheet } from '../form';

export function ListCategoriesTemplate() {
  const { data, ...rest } = useListPaginationCategory({ size: 100 });
  const categoryDelete = useDeleteCategory();

  const [form, setForm] = useState<{ id?: string; open: boolean }>({ open: false });
  const [alertDelete, setAlertDelete] = useState<{ id?: string; open: boolean }>({ open: false });

  const handleClose = () => {
    setForm({ open: false });
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="flex flex-col gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b py-2">
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: item?.color || colorGenerate().rgb }}
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <IconComponent name={item?.icon || 'AArrowDown'} className="size-5 text-white" />
                </div>
                <span>{item.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={() => setForm({ id: item.id, open: true })}
                  className="group rounded p-1"
                >
                  <EditIcon className="size-4 text-gray-400 group-hover:text-gray-500" />
                </Button>
                <Button
                  onClick={() => setAlertDelete({ open: true, id: item.id })}
                  className="group rounded p-1"
                >
                  <TrashIcon className="size-4 stroke-red-500 group-hover:stroke-red-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DataTable />
      </div>

      <CategoryFormSheet onClose={handleClose} open={form.open} id={form.id} />
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
