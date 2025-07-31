import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface TableBodyProps extends HTMLProps<HTMLTableSectionElement> {}

export function TableBody(props: TableBodyProps) {
  const { children, className, ...rest } = props;

  return (
    <tbody className={twMerge('', className)} {...rest}>
      {children}
    </tbody>
  );
}
