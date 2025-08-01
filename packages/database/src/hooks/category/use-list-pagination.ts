import { useMemo } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';
import { useQueryPagination } from '../use-query-pagination';

interface Props {
  query?: string;
  page?: number;
  size?: number;
  setPage?(page?: number | null): void;
  setSize?(size?: number | null): void;
}

export function useListPaginationCategory(props?: Props) {
  const { query, page, size, setPage, setSize } = props || {};

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository;
  }, []);

  const result = useQueryPagination({
    fn: async () => {
      const response = await repository.listPaginate({ query, page, size });
      return response;
    },
    queryKey: ['categories', query, page, size],
    setPage,
    setSize,
  });

  return result;
}
