"use client";
import { useEffect, useState } from "react";

import { DespesasProps, listarTodosDespesas } from "@/services/despesas";
import { FormularioAdicionar } from "./formulario-adicionar";
import { Table } from "./table";
import { Skeleton } from "./skeleton";
import { BotaoAbrirModal } from "./botao-abrir-modal";
import { ExportarDados } from "./exportar-dados";
import { ImportarDados } from "./importar-dados";

export function MainContent() {
  const [despesas, setDespesas] = useState<DespesasProps[]>([]);
  const [loading, setLoading] = useState(true);

  const listarDespesas = async () => {
    try {
      setLoading(true);
      const _despesas = await listarTodosDespesas({
        orderBy: [["data", "desc"]],
      });

      setDespesas(_despesas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) listarDespesas();
  }, [loading]);

  return (
    <>
      <div className="flex gap-2">
        <BotaoAbrirModal>
          <FormularioAdicionar onLoading={setLoading} />
        </BotaoAbrirModal>
        <ExportarDados />
        <ImportarDados />
      </div>

      <div className="mt-5 w-full">
        {loading && <Skeleton />}
        {!loading && <Table data={despesas} />}
      </div>
    </>
  );
}
