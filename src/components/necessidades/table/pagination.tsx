import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange } = props;

  return (
    <nav className="mt-4 flex items-center justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`rounded-l px-3 py-1 ${
          currentPage <= 1 ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Anterior
      </button>
      <span className="px-4 py-1 text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`rounded-r px-3 py-1 ${
          currentPage === totalPages
            ? "bg-gray-200"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
      >
        Próxima
      </button>
    </nav>
  );
};
