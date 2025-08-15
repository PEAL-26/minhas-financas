import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useDatabaseContext } from '../../contexts/database';
import { getRepository } from '../../helpers/repository';
import { UseDeleteProps } from './types';

export function useDelete(props: UseDeleteProps) {
  const { queryKey, repositoryName } = props;

  const { getDatabase } = useDatabaseContext();

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

      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
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
