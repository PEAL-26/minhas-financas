import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';

interface Props {
  query?: string;
}

export function useListAllCategory(props?: Props) {
  const { query } = props || {};

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository;
  }, []);

  const { data = [], ...rest } = useQuery({
    queryFn: async () => {
      const response = await repository.listAll();
      return response;
    },
    queryKey: ['categories', query],
  });

  return { ...rest, data };
}
