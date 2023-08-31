import { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {}

export function TableRow(props: TableRowProps) {
  const { children, className, ...rest } = props;

  return (
    <tr className={twMerge("", className)} {...rest}>
      {children}
    </tr>
  );
}
