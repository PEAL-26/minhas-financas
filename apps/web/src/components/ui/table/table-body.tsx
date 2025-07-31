import { cn } from '@repo/ui/lib/utils';
import { HTMLProps } from 'react';

interface TableBodyProps extends HTMLProps<HTMLTableSectionElement> {}

export function TableBody(props: TableBodyProps) {
  const { children, className, ...rest } = props;

  return (
    <tbody className={cn('', className)} {...rest}>
      {children}
    </tbody>
  );
}
