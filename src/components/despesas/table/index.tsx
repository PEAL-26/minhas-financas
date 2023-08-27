"use client";
import { ReactNode, useEffect, useState } from "react";

import { DespesasProps } from "@/services/despesas";
import { TableEmpty } from "@/components/table-empty";
import { TableFiltro } from "@/components/table-filtro";
import { formatCurrencyKz } from "@/helpers/format-number";
import { TablePagination } from "@/components/table-pagination";

interface TableProps {
  data: DespesasProps[];
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
    array: DespesasProps[],
    searchTerm: string
  ): DespesasProps[] => {
    const regex = new RegExp(searchTerm, "i");

    return array.filter(
      (item) => regex.test(item.descricao) || regex.test(item.local || "")
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
    (accumulator, item) => accumulator + item.total,
    0
  );

  useEffect(() => {
    if (totalPages === 0) setCurrentPage(0);
    else setCurrentPage(1);
  }, [totalPages]);

  return (
    <div className="relative overflow-x-auto p-2">
      <TableFiltro onSearch={handleFilter} />
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Descrição
            </th>
            <th scope="col" className="px-6 py-3">
              Local
            </th>
            <th scope="col" className="px-6 py-3">
              Data
            </th>
            <th scope="col" className="px-6 py-3">
              Data de Término
            </th>
            <th scope="col" className="px-6 py-3">
              Preço
            </th>
            <th scope="col" className="px-6 py-3">
              QTD
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 && <TableEmpty colSpan={8} />}
          {paginatedData.map((item) => (
            <tr key={item.id} className="border-b bg-white hover:bg-gray-50">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 "
              >
                {item.descricao}
              </th>
              <td className="px-6 py-4">{item.local}</td>
              <td className="px-6 py-4">{item.data.toDateString()}</td>
              <td className="px-6 py-4">{item.data_termino?.toDateString()}</td>
              <td className="px-6 py-4">{formatCurrencyKz(item.preco)}</td>
              <td className="px-6 py-4">{item.quantidade}</td>
              <td className="px-6 py-4">{formatCurrencyKz(item.total)}</td>
              <td className="flex gap-2 px-6 py-4">
                {actionButtons && actionButtons(item.id)}
              </td>
            </tr>
          ))}
        </tbody>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          colSpan={8}
        />
      </table>

      <div className="flex h-5 w-full items-center justify-center">
        <span className="text-center text-lg font-bold">
          {formatCurrencyKz(total)}
        </span>
      </div>
    </div>
  );
}
