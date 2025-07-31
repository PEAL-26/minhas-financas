import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {}

export function TableRow(props: TableRowProps) {
  const { children, className, ...rest } = props;

  return (
    <tr className={twMerge('hover:bg-gray-50', className)} {...rest}>
      {children}
    </tr>
  );
}
