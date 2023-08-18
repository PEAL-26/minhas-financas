"use client";
import { useEffect, useState } from "react";

import { GastosProps, listarTodosGastos } from "@/services/gastos";
import { FormularioAdicionar } from "./formulario-adicionar";
import { Table } from "./table";
import { Skeleton } from "./skeleton";
import { BotaoAbrirModal } from "./botao-abrir-modal";

export function MainContent() {
  const [gastos, setGastos] = useState<GastosProps[]>([]);
  const [loading, setLoading] = useState(false);

  const listarGastos = async () => {
    try {
      setLoading(true);
      const _gastos = await listarTodosGastos({
        orderBy: [["data", "desc"]],
      });

      setGastos(_gastos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) listarGastos();
  }, [loading]);

  useEffect(() => {
    listarGastos();
  }, []);

  return (
    <>
      <BotaoAbrirModal>
        <FormularioAdicionar onLoading={setLoading} />
      </BotaoAbrirModal>
      <div className="mt-5 w-full">
        {loading ? <Skeleton /> : <Table data={gastos} />}
      </div>
    </>
  );
}
