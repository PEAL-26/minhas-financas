import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableProps extends HTMLProps<HTMLTableElement> {}

export function TableRoot(props: TableProps) {
  const { children, className, ...rest } = props;

  return (
    <table className={twMerge('w-full table-auto', className)} {...rest}>
      {children}
    </table>
  );
}
