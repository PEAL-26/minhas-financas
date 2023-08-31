"use client";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

import {
  NecessidadeProps,
  listarTodasNecessidades,
} from "@/services/necessidades";
import { Table } from "./table";
// import { Skeleton } from "../skeleton";
// import { BotaoAbrirModal } from "../botao-abrir-modal";
import { FormularioRegistoNecessidade } from "./formulario-registo";
import { Modal } from "@/components/modals";
import { Skeleton } from "@/components/compounds/skeleton";

export function Necessidades() {
  const [necessidades, setNecessidades] = useState<NecessidadeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const listarNecessidades = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await listarTodasNecessidades({
        orderBy: [["prioridade", "desc"]],
      });

      setNecessidades(response);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) listarNecessidades();
  }, [loading]);

  if (error) return null;

  return (
    <>
      <Modal.OpenButton title="Adicionar">
        {(open) => (
          <FormularioRegistoNecessidade open={open} onLoading={setLoading} />
        )}
      </Modal.OpenButton>

      <div className="mt-5 w-full">
        {loading && <Skeleton cols={7} rows={5} />}
        {!loading && (
          <Table
            data={necessidades}
            actionButtons={(id) => (
              <>
                <Modal.OpenButton
                  icon={BsPencilSquare}
                  className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 focus:ring-0"
                >
                  {(open) => (
                    <FormularioRegistoNecessidade
                      open={open}
                      onLoading={setLoading}
                      id={id}
                    />
                  )}
                </Modal.OpenButton>
              </>
            )}
          />
        )}
      </div>
    </>
  );
}
