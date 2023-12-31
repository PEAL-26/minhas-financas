"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  PrioridadeType,
  TIPO_NECESSIDADE,
  createNecessidade,
  updateNecessidade,
  buscarNecessidadePorId,
  TipoNecessidadeKey,
} from "@/services/necessidades";

interface FormularioRegistoNecessidadeProps {
  id?: string;
  open?: boolean;
  onLoading?(state: boolean): void;
}

type Inputs = {
  item: string;
  descricao?: string;
  categoria: string;
  prioridade: PrioridadeType;
  tipo: TipoNecessidadeKey;
  valor: number;
};

export function FormularioRegistoNecessidade(
  props: FormularioRegistoNecessidadeProps
) {
  const { onLoading, open = false, id } = props;
  const tiposNecessidades = Object.keys(
    TIPO_NECESSIDADE
  ) as TipoNecessidadeKey[];

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

      let tipo = Object({});
      tipo[input.tipo] = TIPO_NECESSIDADE[input.tipo];

      const dataInput = { ...input, tipo };

      if (!!id) {
        await updateNecessidade({ ...dataInput, id });
      } else {
        await createNecessidade(dataInput);
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
        const response = await buscarNecessidadePorId(id);

        if (response) {
          const tipo = Object.keys(response.tipo)[0] as TipoNecessidadeKey;
          reset({ ...response, tipo });
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
          <label htmlFor="descricao">Item</label>
          <input
            type="text"
            placeholder="Produto\Serviço"
            {...register("item", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.item && (
            <span className="text-red-600">{errors.item.message}</span>
          )}
        </div>
        <div className="flex w-1/3 flex-col">
          <label htmlFor="categoria">Categoria</label>
          <input
            type="text"
            placeholder="Categoria"
            {...register("categoria", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.categoria && (
            <span className="text-red-600">{errors.categoria.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="descricao">Descrição</label>
        <textarea
          {...register("descricao")}
          rows={3}
          placeholder="Descrição..."
          className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex w-full flex-col">
          <label htmlFor="prioridade">Prioridade</label>
          <select
            placeholder="Selecione a prioridade (minima, normal, máxima)"
            {...register("prioridade", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
            value={1}
          >
            <option value={0}>Mínima</option>
            <option value={1}>
              Normal
            </option>
            <option value={2}>Máxima</option>
          </select>
          {errors.prioridade && (
            <span className="text-red-600">{errors.prioridade.message}</span>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label htmlFor="tipo">Tipo</label>
          <select
            placeholder="Selecione a tipo (única, semanal, mensal, anual)"
            {...register("tipo", {
              required: "Campo Obrigatório",
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          >
            {tiposNecessidades.map((tipo) => (
              <option key={tipo} value={tipo}>
                {TIPO_NECESSIDADE[tipo].display}
              </option>
            ))}
          </select>
          {errors.tipo && (
            <span className="text-red-600">{errors.tipo.message}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col">
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

      <div className="mt-5 flex items-center justify-center gap-3">
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
