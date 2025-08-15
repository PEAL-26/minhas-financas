import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { UseListAllProps } from './types';

type Result<T> = Omit<UseQueryResult<T[]>, 'isLoadingError'> & {
  data: T[];
  isLoadingError?: boolean;
};

export function useListAll<T>(props: UseListAllProps): Result<T> {
  const { queryKey, repositoryName, search } = props;

  const { getDatabase } = useDatabaseContext();

  const { data = [], ...rest } = useQuery({
    queryFn: async () => {
      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
      const response = await repository.listAll(/* TODO Implementar queries */);
      return response as T[];
    },
    queryKey: queryKey || [`${repositoryName}-list-all`],
  });

  return { ...rest, data };
}
