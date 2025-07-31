import { cn } from '@repo/ui/lib/utils';
import { HTMLProps } from 'react';

interface TableRowProps extends HTMLProps<HTMLTableRowElement> {}

export function TableRow(props: TableRowProps) {
  const { children, className, ...rest } = props;

  return (
    <tr className={cn('hover:bg-gray-50', className)} {...rest}>
      {children}
    </tr>
  );
}
