import { stringEmpty } from '@repo/helpers/strings';
import { Button } from '@repo/ui/button';
import { EditIcon, TrashIcon } from '@repo/ui/lib/lucide';
import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';
import { DataTableRowProps } from './types';

export function DataTableRow<T extends { id?: any; [key: string]: any }>(
  props: DataTableRowProps<T>,
) {
  const { fields, data, className, onEdit, onDelete } = props;

  return (
    <tr
      style={{ borderRadius: 10, borderColor: 'black' }}
      className={cn('hover:cursor-pointer hover:bg-gray-100', className)}
    >
      {fields.map((field, index) => {
        let renderData: ReactNode = field?.name ? stringEmpty(data[field.name]) || 'S/N' : 'S/N';

        if (field?.render) {
          renderData = field.render(data);
        }

        return (
          <td key={index} className={cn('w-full px-2 py-3 text-sm', field.className)}>
            {renderData}
          </td>
        );
      })}

      <td className="w-fit px-2 py-3">
        <div className="flex items-center justify-end gap-1">
          <Button onClick={() => onEdit?.(data)} className="group rounded p-1">
            <EditIcon className="size-4 text-gray-400 group-hover:text-gray-500" />
          </Button>
          <Button onClick={() => onDelete?.(data.id)} className="group rounded p-1">
            <TrashIcon className="size-4 stroke-red-500 group-hover:stroke-red-600" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
