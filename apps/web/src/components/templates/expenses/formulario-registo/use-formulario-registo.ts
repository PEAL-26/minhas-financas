'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { buscarDespesaPorId, createDespesa, updateDespesa } from '@/services/despesas';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  data: string;
  data_termino: string | null;
  descricao: string;
  quantidade: number;
  local: string;
  preco: number;
  total: number;
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
    mutationFn: createDespesa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateDespesa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas'] });
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (mutationCreate.isLoading) return;

    try {
      const data = new Date(input.data);
      const data_termino = input.data_termino ? new Date(input.data_termino) : null;

      if (!!id) {
        await mutationUpdate.mutateAsync({ ...input, data, data_termino, id });
      } else {
        await mutationCreate.mutateAsync({ ...input, data, data_termino });
      }
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const calcularTotal = useCallback(
    (quantidade: number, preco: number) => {
      if (Number.isNaN(quantidade) || Number.isNaN(preco)) {
        setValue('total', 0);
        return;
      }

      const _total = quantidade * preco;
      setValue('total', _total);
    },
    [setValue],
  );

  useEffect(() => {
    (async () => {
      if (id) {
        setIsLoading(true);
        const response = await buscarDespesaPorId(id);

        if (response) {
          reset({
            ...response,
            data: response.data.toISOString().substring(0, 10),
            data_termino: response?.data_termino?.toISOString().substring(0, 10) || null,
          });
          calcularTotal(response.quantidade, response.preco);
        }

        setIsLoading(false);
      }
    })();
  }, [calcularTotal, id, reset]);

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
    calcularTotal,
    setError,
  };
}
