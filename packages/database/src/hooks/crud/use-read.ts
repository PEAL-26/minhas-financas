import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { UseReadProps } from './types';

type Result<T> = Omit<UseQueryResult<T>, 'data' | 'isLoadingError'> & {
  data: T | null;
  isLoadingError?: boolean;
};

export function useRead<T>(props: UseReadProps): Result<T> {
  const { id, repositoryName } = props;

  const { getDatabase } = useDatabaseContext();

  const { data = null, ...rest } = useQuery<T>({
    queryFn: async () => {
      if (!id) return null;

      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
      const response = await repository.getById(id);
      return response as any;
    },
    queryKey: [repositoryName, id],
  });

  return { ...rest, data };
}
