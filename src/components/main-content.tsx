"use client";
import { useEffect, useState } from "react";

import { GastosProps, listarTodosGastos } from "@/services/gastos";
import { FormularioAdicionar } from "./formulario-adicionar";
import { Table } from "./table";
import { Skeleton } from "./skeleton";

export function MainContent() {
  const [gastos, setGastos] = useState<GastosProps[]>([]);
  const [loading, setLoading] = useState(false);

  const listarGastos = async () => {
    try {
      const _gastos = await listarTodosGastos();
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
      <FormularioAdicionar onLoading={setLoading} />

      <div className="mt-5 w-full">
        {loading ? <Skeleton /> : <Table data={gastos} />}
      </div>
    </>
  );
}
