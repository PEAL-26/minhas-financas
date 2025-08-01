import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';

export function useDeleteCategory() {
  const { getDatabase } = useDatabaseContext();

  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository;
  }, []);

  const queryClient = useQueryClient();

  const handle = async (id: string) => {
    if (isLoading) return;

    try {
      setError(null);
      setIsLoading(true);
      setSuccess(false);

      if (!id) throw new Error('id required');

      await repository.delete(id);
      await queryClient.invalidateQueries({ queryKey: ['categories'] });

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
