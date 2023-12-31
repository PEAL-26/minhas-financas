"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { createRenda, updateRenda, buscarRendaPorId } from "@/services/rendas";

interface FormularioRegistoRendaProps {
  id?: string;
  open?: boolean;
  onLoading?(state: boolean): void;
}

type Inputs = {
  tipo: string;
  descricao: string;
  moeda: string;
  valor: number;
};

export function FormularioRegistoRenda(props: FormularioRegistoRendaProps) {
  const { onLoading, open = false, id } = props;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (loading) return;

    try {
      setLoading(true);

      const dataInput = { ...input };

      if (!!id) {
        await updateRenda({ ...dataInput, id });
      } else {
        await createRenda(dataInput);
      }

      onLoading && onLoading(true);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (id && open) {
        setLoadingEdit(true);
        const response = await buscarRendaPorId(id);

        if (response) {
          reset({ ...response });
        }

        setLoadingEdit(false);
      }
    })();
  }, [id, open, reset]);

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (loadingEdit) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex w-2/3 flex-col">
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            placeholder="Descrição"
            {...register("descricao", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.descricao && (
            <span className="text-red-600">{errors.descricao.message}</span>
          )}
        </div>
        <div className="flex w-1/3  flex-col">
          <label htmlFor="tipo">Tipo</label>
          <select
            placeholder="Selecione a tipo (minima, normal, máxima)"
            {...register("tipo", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
            value={1}
          >
            <option value={0}>Única</option>
            <option value={1}>Semanal</option>
            <option value={2}>Mensal</option>
            <option value={2}>Anual</option>
          </select>
          {errors.tipo && (
            <span className="text-red-600">{errors.tipo.message}</span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex w-2/3 flex-col">
          <label htmlFor="valor">Valor</label>
          <input
            type="text"
            {...register("valor", {
              required: "Campo Obrigatório",
              min: { message: "O valor não pode ser 0 ou negativo", value: 1 },
              valueAsNumber: true,
              validate: (valor) => {
                if (Number.isNaN(valor)) {
                  setError("valor", { message: "O valor não é um número." });
                  return "O valor não é um número";
                }
              },
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.valor && (
            <span className="text-red-600">{errors.valor.message}</span>
          )}
        </div>
        <div className="flex w-1/3  flex-col">
          <label htmlFor="moeda">Moeda</label>
          <input
            type="text"
            placeholder="Moeda (ex.: Kz)"
            {...register("moeda", {
              required: "Campo Obrigatório",
            })}
            defaultValue={"Kz"}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.moeda && (
            <span className="text-red-600">{errors.moeda.message}</span>
          )}
        </div>
      </div>

      <div className="tipos-center mt-5 flex justify-center gap-3">
        <button
          type="submit"
          data-loading={loading}
          disabled={loading}
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 data-[loading=true]:cursor-wait data-[loading=true]:bg-gray-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
