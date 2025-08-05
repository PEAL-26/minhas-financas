import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { IRepository } from '../../types';
import { UseListAllProps } from './types';
import { getRepository } from './utils';

export function useListAll<T>(props: UseListAllProps) {
  const { queryKey, repositoryName, search } = props;

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database) as unknown as IRepository<T>;

    return repository;
  }, []);

  const { data = [], ...rest } = useQuery({
    queryFn: async () => {
      const response = await repository.listAll(/* TODO Implementar queries */);
      return response as T[];
    },
    queryKey: queryKey || [`${repositoryName}-list-all`],
  });

  return { ...rest, data };
}
