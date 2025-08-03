import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';

interface Props {
  id?: string;
}

export function useGetByIdCategory(props: Props) {
  const { id } = props || {};

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository;
  }, []);

  const { data = null, ...rest } = useQuery({
    queryFn: async () => {
      if (!id) return null;

      const response = await repository.getById(id);
      return response;
    },
    queryKey: ['category', id],
  });

  return { ...rest, data };
}
