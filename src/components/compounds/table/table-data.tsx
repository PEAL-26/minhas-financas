import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "@/libs/material-tailwind";

interface TableDataProps extends HTMLProps<HTMLTableCellElement> {}

export function TableData(props: TableDataProps) {
  const { children, data, className, ...rest } = props;

  return (
    <td
      className={twMerge("border-b border-blue-gray-50 px-5 py-2", className)}
      {...rest}
    >
      <Typography className="text-xs font-semibold text-blue-gray-600">
        {data || children}
      </Typography>
    </td>
  );
}
