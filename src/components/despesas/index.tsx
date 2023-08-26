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
import { FormularioRegisto } from "./formulario-registo";
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

  useEffect(() => {
    if (loading) listarDespesas();
  }, [loading]);

  if (error) return null;

  return (
    <>
      <div className="flex gap-2">
        <BotaoAbrirModal title="Adicionar" icon={AiOutlinePlus}>
          {(open) => <FormularioRegisto open={open} onLoading={setLoading} />}
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
              <div className="flex gap-1">
                <BotaoAbrirModal
                  icon={BsPencilSquare}
                  className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 focus:ring-0"
                >
                  {(open) => (
                    <FormularioRegisto
                      open={open}
                      onLoading={setLoading}
                      id={id}
                    />
                  )}
                </BotaoAbrirModal>

                <button
                  onClick={async () => {
                    await removeDespesa(id);
                    await listarDespesas();
                  }}
                >
                  <BiTrashAlt size={24} className="text-red-500" />
                </button>
              </div>
            )}
          />
        )}
      </div>
    </>
  );
}
