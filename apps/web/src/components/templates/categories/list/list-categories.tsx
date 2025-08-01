'use client';

import { DataTable } from '@/components/ui/table/data';
import {
  useCreateCategory,
  useDeleteCategory,
  useListPaginationCategory,
  useUpdateCategory,
} from '@repo/database/hooks/category';

export function ListCategoriesTemplate() {
  const { data, ...rest } = useListPaginationCategory({ size: 100 });
  const { handle, error, isSubmitting, isSuccess } = useCreateCategory();
  const update = useUpdateCategory();
  const _delete = useDeleteCategory();

  console.log('create', { error, isSubmitting, isSuccess });
  console.log('list', rest);

  return (
    <div className="flex flex-col p-4">
      <button
        className="w-fit rounded-md bg-primary p-2 font-bold text-white hover:cursor-pointer hover:bg-primary-600"
        onClick={() => handle({ name: 'Teste' })}
      >
        Salvar
      </button>

      <div className="flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={index} className="border-b">
            {JSON.stringify(item, null, 2)}{' '}
            <button onClick={() => update.handle({ name: 'Nome alterado' }, item.id)}>
              Editar
            </button>
            {' | '}
            <button onClick={() => _delete.handle(item.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      <DataTable />
    </div>
  );
}
