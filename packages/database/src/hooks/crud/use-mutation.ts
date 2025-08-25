import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { useDatabaseContext } from '../../contexts/database';
import { getRepository, getSchema } from '../../helpers/repository';
import { UseMutationProps } from './types';

export function useMutation<SchemaType extends FieldValues = any>(
  props: UseMutationProps<SchemaType>,
) {
  const { id, defaultValues, queryKey, repositoryName, loadingData, onSuccess, onError } = props;

  const [error, setError] = useState<any>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [loadingDataError, setLoadingDataError] = useState<any>(null);

  const { getDatabase } = useDatabaseContext();

  const schema = getSchema(repositoryName);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const handle = async (input: SchemaType) => {
    if (isSubmitting) return;

    try {
      setError(null);
      setSubmitting(true);
      setSuccess(false);

      const database = await getDatabase();
      const repository = getRepository(repositoryName, database);
      const data = await schema.parseAsync(input);

      if (id) {
        await repository.update(data as any, id);
      } else {
        await repository.create(data as any);
      }

      setTimeout(async () => {
        await queryClient.invalidateQueries({ queryKey: [repositoryName, id] });
        await queryClient.invalidateQueries({ queryKey });
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

  const reload = async () => {
    if (id && loadingData && !isLoadingData) {
      try {
        setIsLoadingData(true);
        setLoadingDataError(null);

        const database = await getDatabase();
        const repository = getRepository(repositoryName, database);
        const response = await repository.getById(id);

        if (!response) {
          const error = new Error('Recurso não encontrado!');
          setLoadingDataError(error);
          onError?.(error);
          return;
        }

        const data = await schema.parseAsync(response);

        Object.entries(data).forEach(([key, value]) => {
          form.setValue(key as unknown as any, value);
        });
      } catch (error) {
        setLoadingDataError(error);
        onError?.(error);
      } finally {
        setIsLoadingData(false);
      }
    }
  };

  useEffect(() => {
    reload();
  }, [id, loadingData]);

  return {
    handle,
    handleFormSubmit: form.handleSubmit(handle),
    form,
    error,
    isSubmitting,
    isSuccess,
    isLoadingData,
    loadingDataError,
    reload,
  };
}
