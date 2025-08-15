import { useState } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { PaginatedResult, RepositoryName } from '../../types';
import { IQueryPaginationResponse, useQueryPagination } from '../use-query-pagination';

interface Props {
  repositoryName: RepositoryName;
  queryKey: string[];
  defaultSize?: number;
}

type Result<TData> = IQueryPaginationResponse<TData> & {
  search?(text: string): void;
};

export function useQuerySelect<TData = any, TParams extends Record<string, any> = any>(
  props: Props,
): Result<TData> {
  const { repositoryName, queryKey, defaultSize = 10 } = props;

  const [searchQuery, setSearchQuery] = useState('');

  //const searchQueryDebounced = ''; //useDebounceValue(searchQuery);

  const { getDatabase } = useDatabaseContext();

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
      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
      const params = { page, query: searchQuery, size: defaultSize } as unknown as TParams;
      const response = await repository.listPaginate(params);
      return response as PaginatedResult<TData>;
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
