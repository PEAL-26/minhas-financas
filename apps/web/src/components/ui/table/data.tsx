import { ReactNode } from 'react';

import { IQueryPaginationResponse } from '@repo/database/hooks/use-query-pagination';
import { stringEmpty } from '@repo/helpers/strings';
import { Button } from '@repo/ui/button';
import { ErrorComponent } from '@repo/ui/error-component';
import { EditIcon, InboxIcon, TrashIcon } from '@repo/ui/lib/lucide';
import { cn } from '@repo/ui/lib/utils';

type Field<T> = {
  title: string;
  name: keyof T;
  className?: string;
  render?(item: T): ReactNode;
};

interface Props<T extends { id: any }> {
  response: IQueryPaginationResponse<T>;
  onEdit?(item: T): void;
  onDelete?(id: string): void;
  fields: Field<T>[];
}

export function DataTable<T extends { id: any }>(props: Props<T>) {
  const { response, fields, onEdit, onDelete } = props;

  return (
    <table>
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th
              key={index}
              className={cn(
                'border-y px-2 py-1 text-left font-medium text-gray-400',
                field.className,
              )}
            >
              {field.title}
            </th>
          ))}
          <th className="w-16 border-y px-2 py-1"></th>
        </tr>
      </thead>
      <tbody>
        {response.isLoadingAll &&
          !response.isError &&
          Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              {Array.from({ length: fields.length + 1 }).map((_, indexTd) => (
                <td className="px-2 py-3" key={indexTd}>
                  <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        {!response.isLoadingAll && response.isError && (
          <tr>
            <td colSpan={fields.length + 1}>
              <ErrorComponent onRefetch={response.refetch} containerClassName="min-h-52" />
            </td>
          </tr>
        )}
        {response.isEmpty && (
          <tr>
            <td colSpan={fields.length + 1}>
              <div className="flex min-h-52 flex-col items-center justify-center">
                <InboxIcon className="size-24 text-gray-400" />
                <span className="text-xs text-gray-400">Sem nenhum registro.</span>
              </div>
            </td>
          </tr>
        )}
        {!response.isLoadingAll &&
          !response.isEmpty &&
          !response.isError &&
          response.data.map((item, index) => (
            <tr key={index} className="hover:cursor-pointer hover:bg-gray-100">
              {fields.map((field, index) => {
                let data: ReactNode = stringEmpty(item[field.name]);

                if (field?.render) {
                  data = field.render(item);
                }

                return (
                  <td key={index} className={cn('px-2 py-3', field.className)}>
                    {data}
                  </td>
                );
              })}

              <td className="w-fit px-2 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button onClick={() => onEdit?.(item)} className="group rounded p-1">
                    <EditIcon className="size-4 text-gray-400 group-hover:text-gray-500" />
                  </Button>
                  <Button onClick={() => onDelete?.(item.id)} className="group rounded p-1">
                    <TrashIcon className="size-4 stroke-red-500 group-hover:stroke-red-600" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={fields.length + 1}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">{response.data.length} item(s)</span>
              </div>
              <div>
                <span className="text-xs text-gray-400">Items por Página</span>
              </div>
              <div className="flex items-center gap-2">
                <Button disabled={!response?.prev} onClick={response.prevPage}>
                  Anterior
                </Button>
                <div className="text-xs text-gray-400">
                  {response?.currentPage}/{response?.totalPages ?? 0}
                </div>
                <Button
                  disabled={!response?.next}
                  onClick={() => {
                    response?.nextPage?.();
                  }}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
