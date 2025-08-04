import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, CategorySchemaType } from '@repo/types/schemas/category';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDatabaseContext } from '../../contexts/database';
import { CategoryRepository } from '../../repositories/categories';

interface Props {
  id?: string;
  onSuccess?(): void;
  onError?(error: any): void;
  defaultValues?: CategorySchemaType;
  reset?: boolean;
}

export function useMutationCategory(props?: Props) {
  const { id, defaultValues, reset, onSuccess, onError } = props || {};

  const { getDatabase } = useDatabaseContext();

  const [error, setError] = useState<any>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues,
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

      if (id) {
        await repository.update(data, id);
      } else {
        await repository.create(data);
      }

      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: ['category', id] });
        await queryClient.invalidateQueries({ queryKey: ['categories'] });
      }, 300);

      setSuccess(true);
      onSuccess?.();
    } catch (error) {
      setError(error);
      onError?.(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (reset) {
      setError(null);
      setSubmitting(false);
      setSuccess(false);
    }
  }, [reset]);

  useEffect(() => {
    console.log(defaultValues);

    if (defaultValues) {
      Object.entries(defaultValues).forEach(([property, value]) => {
        form.setValue(property as keyof CategorySchemaType, value);
      });
    }
  }, [defaultValues]);

  return {
    handle,
    handleFormSubmit: form.handleSubmit(handle),
    form,
    error,
    isSubmitting,
    isSuccess,
  };
}
