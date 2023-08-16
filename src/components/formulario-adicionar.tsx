"use client";
import { createGastos } from "@/services/gastos";
import { useState } from "react";
import { useForm, SubmitHandler, ValidateResult } from "react-hook-form";
import ImportarDados from "./impoertar-dados";

interface FormularioAdicionarProps {
  id?: string;
  onLoading?(state: boolean): void;
}

type Inputs = {
  data: Date;
  data_termino: Date | null;
  descricao: string;
  quantidade: number;
  local: string;
  preco: number;
  total: number;
};

export function FormularioAdicionar(props: FormularioAdicionarProps) {
  const { onLoading } = props;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loading) return;

    try {
      setLoading(true);
      await createGastos({ ...data, total });
      onLoading && onLoading(true);
      reset();
      setTotal(0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calcularTotal = (quantidade: number, preco: number) => {
    if (Number.isNaN(quantidade) || Number.isNaN(preco)) {
      setTotal(0);
      return;
    }

    const _total = quantidade * preco;
    setTotal(_total);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-96 flex-col gap-3"
    >
      <div className="flex gap-3">
        <div className="flex w-full flex-col">
          <label htmlFor="data">Data Gasto</label>
          <input
            type="date"
            {...register("data", { required: "Campo Obrigatório" })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
          {errors.data && (
            <span className="text-red-600">{errors.data.message}</span>
          )}
        </div>
        <div className="flex w-full  flex-col">
          <label htmlFor="data_termino">Data Término</label>
          <input
            type="date"
            {...register("data_termino")}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          {...register("descricao", { required: "Campo Obrigatório" })}
          className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
        />
        {errors.descricao && (
          <span className="text-red-600">{errors.descricao.message}</span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="local">Local</label>
        <input
          type="text"
          {...register("local")}
          className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex flex-col">
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            {...register("quantidade", {
              required: "Campo Obrigatório",
              min: { message: "Tem de ter no mínimo 1 quantidade", value: 1 },
              valueAsNumber: true,
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
            onChange={(e) =>
              calcularTotal(parseFloat(e.target.value), watch("preco"))
            }
          />
          {errors.quantidade && (
            <span className="text-red-600">{errors.quantidade.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="preco">Preço</label>
          <input
            type="text"
            {...register("preco", {
              required: "Campo Obrigatório",
              min: { message: "Tem de ter no mínimo 1 quantidade", value: 1 },
              valueAsNumber: true,
              validate: (valor) => {
                if (Number.isNaN(valor)) {
                  setError("preco", { message: "O valor não é um número." });
                  return "O valor não é um número";
                }
              },
            })}
            className="block w-full rounded-lg border border-gray-300 bg-gray-100  p-2.5 text-sm text-gray-900"
            onChange={(e) =>
              calcularTotal(watch("quantidade"), parseFloat(e.target.value))
            }
          />
          {errors.preco && (
            <span className="text-red-600">{errors.preco.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="total">Total</label>
          <input
            type="text"
            readOnly
            {...register("total")}
            value={total}
            className="block w-full cursor-not-allowed rounded-lg border border-gray-300  bg-gray-100 p-2.5 text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="submit"
          data-loading={loading}
          disabled={loading}
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 data-[loading=true]:cursor-wait data-[loading=true]:bg-gray-700"
        >
          Adicionar
        </button>
        <ImportarDados />
      </div>
    </form>
  );
}
