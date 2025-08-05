import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useDatabaseContext } from '../../contexts/database';
import { IRepository } from '../../types';
import { UseReadProps } from './types';
import { getRepository } from './utils';

export function useRead<T>(props: UseReadProps) {
  const { id, repositoryName } = props;

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database) as unknown as IRepository<T>;

    return repository;
  }, []);

  const { data = null, ...rest } = useQuery({
    queryFn: async () => {
      if (!id) return null;

      const response = await repository.getById(id);
      return response;
    },
    queryKey: [repositoryName, id],
  });

  return { ...rest, data };
}
