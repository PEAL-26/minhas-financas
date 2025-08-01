import { categorySchema, CategorySchemaType } from '@repo/types/schemas/category';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
//import { zodResolver } from '@hookform/resolvers/zod';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';

interface Props {}

export function useCreateCategory(props?: Props) {
  const {} = props || {};

  const { getDatabase } = useDatabaseContext();

  const [error, setError] = useState<any>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const form = useForm<CategorySchemaType>({
    // resolver: zodResolver(categorySchema),
  });

  const repository = useMemo(() => {
    const database = getDatabase();
    const repository = new CategoryRepository(database);

    return repository;
  }, []);

  const queryClient = useQueryClient();

  const handle = async (input: CategorySchemaType) => {
    if (isSubmitting) return;

    try {
      setError(null);
      setSubmitting(true);
      setSuccess(false);

      const data = await categorySchema.parseAsync(input);
      await repository.create(data);
      await queryClient.invalidateQueries({ queryKey: ['categories'] });

      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handle,
    handleFormSubmit: form.handleSubmit(handle),
    form,
    error,
    isSubmitting,
    isSuccess,
  };
}
