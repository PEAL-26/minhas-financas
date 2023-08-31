"use client";
import { ReactNode, useEffect, useState } from "react";

import {
  NecessidadeProps,
  getTipoNecessidadeValue,
  prioridadeToString,
} from "@/services/necessidades";
// import { TableFiltro } from "@/components/table-filtro";
import { formatCurrencyKz } from "@/helpers/format-number";
// import { TablePagination } from "@/components/table-pagination";
import { TableEmpty } from "@/components/compounds/table/table-empty";

interface TableProps {
  data: NecessidadeProps[];
  itemsPerPage?: number;
  actionButtons?(id: string): ReactNode;
}

export function Table(props: TableProps) {
  const { data, itemsPerPage = 10, actionButtons } = props;
  const [filtro, setFiltro] = useState("");

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filtroLike = (
    array: NecessidadeProps[],
    searchTerm: string
  ): NecessidadeProps[] => {
    const regex = new RegExp(searchTerm, "i");

    return array.filter(
      (item) => regex.test(item.item) || regex.test(item.descricao || "")
    );
  };

  const handleFilter = (filter: string) => {
    setFiltro(filter);
  };

  const filteredData =
    filtro.trim().length > 1 ? filtroLike(data, filtro) : data;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const total = filteredData.reduce(
    (accumulator, item) => accumulator + item.valor,
    0
  );

  useEffect(() => {
    if (totalPages === 0) setCurrentPage(0);
    else setCurrentPage(1);
  }, [totalPages]);

  return (
    <div className="relative overflow-x-auto p-2">
      {/* <TableFiltro onSearch={handleFilter} /> */}
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item
            </th>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Categoria
            </th>
            <th scope="col" className="px-6 py-3">
              Prioridade
            </th>
            <th scope="col" className="px-6 py-3">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
            <th scope="col" className="px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 && <TableEmpty colSpan={7} />}
          {paginatedData.map((data) => (
            <tr key={data.id} className="border-b bg-white hover:bg-gray-50">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
              >
                {data.item}
              </th>
              <td className="px-6 py-4">{data.descricao}</td>
              <td className="px-6 py-4">{data.categoria}</td>
              <td className="px-6 py-4">
                <span
                  data-prioridade={data.prioridade.toString()}
                  className="rounded p-2 text-white data-[prioridade='0']:bg-orange-500 data-[prioridade='1']:bg-green-500 data-[prioridade='2']:bg-red-500"
                >
                  {prioridadeToString(data.prioridade)}
                </span>
              </td>
              <td className="px-6 py-4">
                {getTipoNecessidadeValue(data.tipo, "display")}
              </td>
              <td className="px-6 py-4">{formatCurrencyKz(data.valor)}</td>
              <td className="flex gap-2 px-6 py-4">
                {actionButtons && actionButtons(data.id || "")}
              </td>
            </tr>
          ))}
        </tbody>

        {/* <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          colSpan={7}
        /> */}
      </table>

      <div className="flex h-5 w-full items-center justify-center">
        <span className="text-center text-lg font-bold">
          {formatCurrencyKz(total)}
        </span>
      </div>
    </div>
  );
}
