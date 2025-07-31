'use client';

import { useCategory } from '@repo/database/hooks/category';
import { useEffect } from 'react';

export function ListCategoriesTemplate() {
  const { listAll, create } = useCategory({ operation: 'listAll' });

  const handleCreate = async () => {
    await create();
    const result = await listAll();

    console.log(result);
  };

  useEffect(() => {
    listAll().then((result) => console.log(result));
  }, []);

  return (
    <div className="flex flex-col p-4">
      <button
        onClick={handleCreate}
        className="w-fit rounded-md bg-primary p-2 font-bold text-white hover:cursor-pointer hover:bg-primary-600"
      >
        Criar
      </button>
    </div>
  );
}
