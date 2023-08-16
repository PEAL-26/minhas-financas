"use client";
import { useEffect, useState } from "react";

import { GastosProps, listarTodosGastos } from "@/services/gastos";
import { FormularioAdicionar } from "./formulario-adicionar";
import { Table } from "./table";
import { Skeleton } from "./skeleton";
import { formatCurrencyKz } from "@/helpers/format-number";

export function MainContent() {
  const [gastos, setGastos] = useState<GastosProps[]>([]);
  const [loading, setLoading] = useState(false);

  const listarGastos = async () => {
    try {
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

  const total = gastos.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  );

  return (
    <>
      <FormularioAdicionar onLoading={setLoading} />

      <div className="mt-5 w-full">
        {loading ? <Skeleton /> : <Table data={gastos} />}
        <div className="flex h-5 w-full items-center justify-center">
          <span className="text-center text-lg font-bold">
            {formatCurrencyKz(total)}
          </span>
        </div>
      </div>
    </>
  );
}
