import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  colSpan?: number;
}

export const TablePagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange, colSpan } = props;

  return (
    <tfoot>
      <tr>
        <td colSpan={colSpan}>
          <nav className="flex items-center justify-end gap-8 p-4">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography color="gray" className="font-normal">
              Página <strong className="text-gray-900">{currentPage}</strong> of{" "}
              <strong className="text-gray-900">{totalPages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </nav>
        </td>
      </tr>
    </tfoot>
  );
};
