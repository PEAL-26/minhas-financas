import { HTMLProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TableBodyProps extends HTMLProps<HTMLTableSectionElement> {}

export function TableBody(props: TableBodyProps) {
  const { children, className, ...rest } = props;

  return (
    <tbody className={cn('', className)} {...rest}>
      {children}
    </tbody>
  );
}
