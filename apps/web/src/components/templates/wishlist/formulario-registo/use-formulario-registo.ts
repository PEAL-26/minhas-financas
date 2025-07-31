'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  PrioridadeType,
  TIPO_NECESSIDADE,
  TipoNecessidadeKey,
  buscarNecessidadePorId,
  createNecessidade,
  updateNecessidade,
} from '@/services/necessidades';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  item: string;
  descricao?: string;
  categoria: string;
  prioridade: PrioridadeType;
  tipo: TipoNecessidadeKey;
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
    mutationFn: createNecessidade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['necessidades'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateNecessidade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['necessidades'] });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (mutationCreate.isLoading) return;

    try {
      let tipo = Object({});
      tipo[input.tipo] = TIPO_NECESSIDADE[input.tipo];

      const dataInput = { ...input, tipo };

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

        const response = await buscarNecessidadePorId(id);

        if (response) {
          const tipo = Object.keys(response.tipo)[0] as TipoNecessidadeKey;
          reset({ ...response, tipo });
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
