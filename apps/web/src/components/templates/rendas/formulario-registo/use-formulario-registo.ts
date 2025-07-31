'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { buscarRendaPorId, createRenda, updateRenda } from '@/services/rendas';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  tipo: string;
  descricao: string;
  moeda: string;
  valor: number;
};

export function useFormularioRegisto(id?: string) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutationCreate = useMutation({
    mutationFn: createRenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rendas'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateRenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rendas'] });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (mutationCreate.isLoading) return;

    try {
      const dataInput = { ...input };

      if (!!id) {
        await mutationUpdate.mutateAsync({ ...dataInput, id });
      } else {
        await mutationCreate.mutateAsync(dataInput);
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (id) {
        setIsLoading(true);

        const response = await buscarRendaPorId(id);

        if (response) {
          reset({ ...response });
        }

        setIsLoading(false);
      }
    })();
  }, [id, reset]);

  useEffect(() => {
    reset();
  }, [reset]);

  return {
    isLoading,
    saving: mutationUpdate.isLoading || mutationCreate.isLoading,
    errors,
    register,
    handleSubmit,
    onSubmit,
    watch,
    setError,
  };
}
