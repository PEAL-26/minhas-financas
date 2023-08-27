"use client";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { RendaProps, listarTodasRendas } from "@/services/rendas";

import { Table } from "./table";
import { Skeleton } from "../skeleton";
import { BotaoAbrirModal } from "../botao-abrir-modal";
import { FormularioRegistoRenda } from "./formulario-registo";

export function Rendas() {
  const [rendas, setRendas] = useState<RendaProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarRendas = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await listarTodasRendas();

      setRendas(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) listarRendas();
  }, [loading]);

  if (error) return null;

  return (
    <>
      <BotaoAbrirModal title="Adicionar" icon={AiOutlinePlus}>
        {(open) => (
          <FormularioRegistoRenda open={open} onLoading={setLoading} />
        )}
      </BotaoAbrirModal>

      <div className="mt-5 w-full">
        {loading && <Skeleton cols={5} rows={4} />}
        {!loading && (
          <Table
            data={rendas}
            actionButtons={(id) => (
              <>
                <BotaoAbrirModal
                  icon={BsPencilSquare}
                  className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 focus:ring-0"
                >
                  {(open) => (
                    <FormularioRegistoRenda
                      open={open}
                      onLoading={setLoading}
                      id={id}
                    />
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
