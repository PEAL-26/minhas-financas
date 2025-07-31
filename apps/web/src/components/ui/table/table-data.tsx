import { Typography } from '@/libs/material-tailwind';
import { HTMLProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface TableDataProps extends HTMLProps<HTMLTableCellElement> {}

export function TableData(props: TableDataProps) {
  const { children, data, className, ...rest } = props;

  return (
    <td className={cn('border-blue-gray-50 border-b px-5 py-2', className)} {...rest}>
      <Typography className="text-blue-gray-600 text-xs font-semibold">
        {data || children || ''}
      </Typography>
    </td>
  );
}
