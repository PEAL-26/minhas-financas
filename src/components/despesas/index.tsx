"use client";
import { useEffect, useState } from "react";
import {
  DespesasProps,
  listarTodosDespesas,
  removeDespesa,
} from "@/services/despesas";

import { Table } from "./table";
import { Skeleton } from "../skeleton";
import { ExportarDados } from "../exportar-dados";
import { ImportarDados } from "../importar-dados";
import { BotaoAbrirModal } from "../botao-abrir-modal";
import { FormularioRegistoDespesa } from "./formulario-registo";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { BiTrashAlt } from "react-icons/bi";

export function MainContent() {
  const [despesas, setDespesas] = useState<DespesasProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarDespesas = async () => {
    try {
      setLoading(true);
      setError(false);

      const _despesas = await listarTodosDespesas({
        orderBy: [["data", "desc"]],
      });

      setDespesas(_despesas);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveDespesa = async (id: string) => {
    try {
      setError(false);

      await removeDespesa(id);
      await listarDespesas();
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) listarDespesas();
  }, [loading]);

  if (error) return null;

  return (
    <>
      <div className="flex gap-2">
        <BotaoAbrirModal title="Adicionar" icon={AiOutlinePlus}>
          {(open) => (
            <FormularioRegistoDespesa open={open} onLoading={setLoading} />
          )}
        </BotaoAbrirModal>
        <ExportarDados />
        <ImportarDados />
      </div>

      <div className="mt-5 w-full">
        {loading && <Skeleton />}
        {!loading && (
          <Table
            data={despesas}
            actionButtons={(id) => (
              <>
                <BotaoAbrirModal
                  icon={BsPencilSquare}
                  className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 focus:ring-0"
                >
                  {(open) => (
                    <FormularioRegistoDespesa
                      open={open}
                      onLoading={setLoading}
                      id={id}
                    />
                  )}
                </BotaoAbrirModal>
                <BotaoAbrirModal
                  icon={BiTrashAlt}
                  className="bg-transparent text-red-500 hover:bg-transparent hover:text-red-700 focus:ring-0"
                  closeButton={false}
                >
                  {(open) => (
                    <div className="">
                      <span className="text-center">
                        Deseja remover esse item?
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="rounded bg-green-600 px-4 py-2 text-white"
                          onClick={() => handleRemoveDespesa(id)}
                        >
                          Sim
                        </button>
                        <button className="rounded bg-red-500 px-4 py-2 text-white ">
                          Não
                        </button>
                      </div>
                    </div>
                  )}
                </BotaoAbrirModal>
              </>
            )}
          />
        )}
      </div>
    </>
  );
}
