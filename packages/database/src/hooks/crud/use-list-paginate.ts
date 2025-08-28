import { useEffect } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { PaginatedResult } from '../../types';
import { useQueryPagination } from '../use-query-pagination';
import { UseListPaginateProps } from './types';

export function useListPaginate<T>(props: UseListPaginateProps) {
  const { query, page = 1, size = 10, queryKey, repositoryName, setPage, setSize, onError } = props;

  const { getDatabase } = useDatabaseContext();

  const result = useQueryPagination({
    fn: async () => {
      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
      const response = await repository.listPaginate({ query, page, size });
      return response as PaginatedResult<T>;
    },
    queryKey: [...(queryKey || [`${repositoryName}-list-paginate`]), query, page, size],
    setPage,
    setSize,
  });

  useEffect(() => {
    if (result.fetchStatus === 'idle' && result.status === 'error') {
      onError?.(result.error);
    }
  }, [result.fetchStatus]);

  return result;
}
