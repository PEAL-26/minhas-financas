import { HTMLProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {}

export function TableRow(props: TableRowProps) {
  const { children, className, ...rest } = props;

  return (
    <tr className={cn('hover:bg-gray-50', className)} {...rest}>
      {children}
    </tr>
  );
}
