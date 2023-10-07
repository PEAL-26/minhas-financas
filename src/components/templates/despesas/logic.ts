"use client";
import { useEffect, useState } from "react";
import { DespesasProps } from "@/services/despesas";

interface LogicTableProps {
  data: DespesasProps[];
  itemsPerPage?: number;
}

export function useLogicTable(props: LogicTableProps) {
  const { data, itemsPerPage = 1 } = props;
  const [filtro, setFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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

  return {
    handleFilter,
    handlePageChange,
    paginatedData,
    currentPage,
    totalPages,
    total,
  };
}
