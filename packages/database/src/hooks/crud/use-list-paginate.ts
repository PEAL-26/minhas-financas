import { useEffect, useMemo } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { IRepository } from '../../types';
import { useQueryPagination } from '../use-query-pagination';
import { UseListPaginateProps } from './types';

export function useListPaginate<T>(props: UseListPaginateProps) {
  const { query, page = 1, size = 10, queryKey, repositoryName, setPage, setSize, onError } = props;

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database) as unknown as IRepository<T>;

    return repository;
  }, []);

  const result = useQueryPagination({
    fn: async () => {
      const response = await repository.listPaginate({ query, page, size });
      return response;
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
