import { useMemo, useState } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { IRepository, RepositoryName } from '../../types';
import { useQueryPagination } from '../use-query-pagination';

interface Props<TData, TParams = Record<string, any>> {
  repositoryName: RepositoryName;
  queryKey: string[];
  defaultSize?: number;
}

export function useQuerySelect<TData = any, TParams extends Record<string, any> = any>(
  props: Props<TData, TParams>,
) {
  const { repositoryName, queryKey, defaultSize = 10 } = props;

  const [searchQuery, setSearchQuery] = useState('');

  //const searchQueryDebounced = ''; //useDebounceValue(searchQuery);

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database) as unknown as IRepository<TData>;

    return repository;
  }, []);

  const selectQuery = useQueryPagination({
    // query: searchQueryDebounced,
    // size: defaultSize,
    queryKey: [
      ...(queryKey || [`${repositoryName}-list-select-paginate`]),
      searchQuery,
      defaultSize,
    ],
    enableSetPageParams: false,
    fn: async ({ page }) => {
      const params = { page, query: searchQuery, size: defaultSize } as unknown as TParams;
      const response = await repository.listPaginate(params);
      return response;
    },
  });

  // useEffect(() => {
  //   if (result.fetchStatus === 'idle' && result.status === 'error') {
  //     onError?.(result.error);
  //   }
  // }, [result.fetchStatus]);

  return {
    ...selectQuery,
    search: setSearchQuery,
  };
}
