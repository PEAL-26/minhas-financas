import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { useDatabaseContext } from '../../contexts/database';
import { UseDeleteProps } from './types';
import { getRepository } from '../../helpers/repository';

export function useDelete(props: UseDeleteProps) {
  const { queryKey, repositoryName } = props;

  const { getDatabase } = useDatabaseContext();

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = getRepository(repositoryName, database);

    return repository;
  }, []);

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const queryClient = useQueryClient();

  const handle = async (id: string) => {
    if (isLoading) return;

    try {
      setError(null);
      setIsLoading(true);
      setSuccess(false);

      if (!id) throw new Error('id required');

      await repository.delete(id);

      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: [repositoryName, id] });
        await queryClient.invalidateQueries({ queryKey });
      }, 300);

      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handle,
    error,
    isLoading,
    isSuccess,
  };
}
