"use client";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

import {
  NecessidadeProps,
  getTipoNecessidadeValue,
  listarTodasNecessidades,
  prioridadeToString,
} from "@/services/necessidades";
// import { Table } from "./table";
// import { Skeleton } from "../skeleton";
// import { BotaoAbrirModal } from "../botao-abrir-modal";
import { FormularioRegistoNecessidade } from "./formulario-registo";
import { Modal } from "@/components/modals";
import { Skeleton } from "@/components/compounds/skeleton";
import { Container } from "@/components/compounds/container";
import { useQuery } from "@tanstack/react-query";
import { useLogicTable } from "@/hooks/use-table";
import { Table } from "@/components/compounds/table";
import { formatCurrencyKz } from "@/helpers/format-number";

export function Necessidades() {
  // const [necessidades, setNecessidades] = useState<NecessidadeProps[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  // const listarNecessidades = async () => {
  //   try {
  //     setLoading(true);
  //     setError(false);

  //     const response = await listarTodasNecessidades({
  //       orderBy: [["prioridade", "desc"]],
  //     });

  //     setNecessidades(response);
  //   } catch (error) {
  //     setError(true);
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (loading) listarNecessidades();
  // }, [loading]);

  // if (error) return null;

  // return (
  //   <>
  //     <Modal.OpenButton title="Adicionar">
  //       {(open) => (
  //         <FormularioRegistoNecessidade open={open} onLoading={setLoading} />
  //       )}
  //     </Modal.OpenButton>

  //     <div className="mt-5 w-full">
  //       {loading && <Skeleton cols={7} rows={5} />}
  //       {!loading && (
  //         <Table
  //           data={necessidades}
  //           actionButtons={(id) => (
  //             <>
  //               <Modal.OpenButton
  //                 icon={BsPencilSquare}
  //                 className="bg-transparent text-black hover:bg-transparent hover:text-blue-500 focus:ring-0"
  //               >
  //                 {(open) => (
  //                   <FormularioRegistoNecessidade
  //                     open={open}
  //                     onLoading={setLoading}
  //                     id={id}
  //                   />
  //                 )}
  //               </Modal.OpenButton>
  //             </>
  //           )}
  //         />
  //       )}
  //     </div>
  //   </>
  // );

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["necessidades"],
    queryFn: () =>
      listarTodasNecessidades({
        orderBy: [["prioridade", "desc"]],
      }),
  });

  const {
    currentPage,
    paginatedData,
    total,
    totalPages,
    handleFilter,
    handlePageChange,
  } = useLogicTable({ data: data || [], itemsPerPage: 10 });

  if (isError) return null;

  return (
    <Container.Root>
      <Container.Header title="Necessidades">
        {/* <ActionButtonsAdd /> */}
      </Container.Header>
      <Container.Body>
        <Table.Root>
          <Table.Header
            cols={[
              "Item",
              "Descrição",
              "Categoria",
              "Prioridade",
              "Tipo",
              "Valor",
              "",
            ]}
          />
          <Table.Body>
            {isLoading && <Table.Loading />}
            {paginatedData.map((necessidade, index) => (
              <Table.Row key={index}>
                <Table.Data data={necessidade.item} />
                <Table.Data data={necessidade.descricao} />
                <Table.Data data={necessidade.categoria} />
                <Table.Data data={necessidade.prioridade.toString()} />
                <Table.Data>
                  <span
                    data-prioridade={necessidade.prioridade.toString()}
                    className="rounded p-2 text-white data-[prioridade='0']:bg-orange-500 data-[prioridade='1']:bg-green-500 data-[prioridade='2']:bg-red-500"
                  >
                    {prioridadeToString(necessidade.prioridade)}
                  </span>
                </Table.Data>
                <Table.Data data={formatCurrencyKz(necessidade.valor)} />
                <Table.Data>
                  {/* <ActionButtonsMenu id={necessidade.id} /> */}
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
          <Table.Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            colSpan={8}
          />
        </Table.Root>
      </Container.Body>
    </Container.Root>
  );
}
