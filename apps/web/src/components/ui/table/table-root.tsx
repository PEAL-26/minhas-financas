import { cn } from '@repo/ui/lib/utils';
import { HTMLProps } from 'react';

interface TableProps extends HTMLProps<HTMLTableElement> {}

export function TableRoot(props: TableProps) {
  const { children, className, ...rest } = props;

  return (
    <table className={cn('w-full table-auto', className)} {...rest}>
      {children}
    </table>
  );
}
