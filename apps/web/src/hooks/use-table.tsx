'use client';
import { useEffect, useState } from 'react';

interface LogicTableProps<T> {
  data: T[];
  itemsPerPage?: number;
  filters?: string[];
}

export function useLogicTable<T>(props: LogicTableProps<T>) {
  const { data, itemsPerPage = 1 } = props;
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const filtroLike = (array: T[], searchTerm: string): T[] => {
    const regex = new RegExp(searchTerm, 'i');

    // TODO Melhorar essa função
    // return array.filter(
    //   (item) => regex.test(item.descricao) || regex.test(item.local || "")
    // );

    return array;
  };

  const handleFilter = (filter: string) => {
    setFiltro(filter);
  };

  const filteredData = filtro.trim().length > 1 ? filtroLike(data, filtro) : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const total = 0; /*filteredData.reduce(
    (accumulator, item) => accumulator + item.total,
    0
  );*/

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
