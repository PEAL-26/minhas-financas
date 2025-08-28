'use client';

import { useQueryStateParams, useSetQueryStateParams } from '@/hooks/use-search-params';
import { Button } from '@repo/ui/button';
import { ErrorComponent } from '@repo/ui/error-component';
import { InboxIcon } from '@repo/ui/lib/lucide';
import { cn } from '@repo/ui/lib/utils';
import { DataTableRow } from './row';
import {
  DataTableProps,
  Entity,
  RenderFooterProps,
  RenderResponseDataProps,
  RenderStatusProps,
} from './types';

export function DataTable<T extends { id?: any; [key: string]: any } = any>(
  props: DataTableProps<T>,
) {
  const {
    response,
    fields,
    className,
    showHeader = true,
    showFooter = true,
    classNameRow,
    onEdit,
    onDelete,
  } = props;
  const [size, setSize] = useQueryStateParams<number>('size', 'int');
  const setPage = useSetQueryStateParams<number>('page', 'int');

  return (
    <table className={cn('', className)}>
      {showHeader && (
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th
                key={index}
                className={cn(
                  'border-y px-2 py-2 text-left text-sm font-medium text-gray-400',
                  field.className,
                )}
              >
                {field.title}
              </th>
            ))}
            <th className="w-16 border-y px-2 py-1"></th>
          </tr>
        </thead>
      )}

      <tbody>
        {renderStatus({ ...response, totalFields: fields.length + 1 })}
        {renderResponseData({
          response,
          fields,
          className: classNameRow,
          onEdit,
          onDelete,
        })}
      </tbody>
      {renderFooter({ showFooter, response, fields, size, setSize, setPage })}
    </table>
  );
}

function renderResponseData<T extends Entity>(props: RenderResponseDataProps<T>) {
  const { response, ...rest } = props;
  if (!response || (response.isLoadingAll && response.isEmpty && response.isError)) return null;
  return response.data.map((item, index) => <DataTableRow key={index} {...rest} data={item} />);
}

function renderFooter<T extends Entity>(props: RenderFooterProps<T>) {
  const { showFooter, fields, response, size, setSize, setPage } = props;
  if (!showFooter || !response) return null;
  return (
    <tfoot>
      <tr>
        <td colSpan={fields.length + 1}>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">{response.data.length} item(s)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Items por Página</span>
              <select
                className="border-1 h-6 w-10 appearance-none rounded-md border-border bg-none p-0 text-center text-xs text-gray-400 focus:border-none focus:ring-primary"
                value={String(size || 10)}
                onChange={(e) => {
                  setSize?.(Number(e.target.value || '10'));
                  setPage?.(1);
                }}
              >
                <option value="10" className="p-1 hover:bg-accent/50 focus:bg-accent/50">
                  10
                </option>
                <option value="20" className="p-1 hover:bg-accent/50 focus:bg-accent/50">
                  20
                </option>
                <option value="50" className="p-1 hover:bg-accent/50 focus:bg-accent/50">
                  50
                </option>
                <option value="100" className="p-1 hover:bg-accent/50 focus:bg-accent/50">
                  100
                </option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button disabled={!response?.prev} onClick={response.prevPage}>
                Anterior
              </Button>
              <div className="text-xs text-gray-400">
                {response?.currentPage ?? 0}/{response?.totalPages ?? 0}
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
  );
}

function renderStatus(props: RenderStatusProps) {
  const { isLoadingAll, isError, isEmpty, totalFields, refetch } = props;
  if (isLoadingAll) {
    return Array.from({ length: 6 }).map((_, index) => (
      <tr key={index}>
        {Array.from({ length: totalFields }).map((_, indexTd) => (
          <td className="px-2 py-3" key={indexTd}>
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
          </td>
        ))}
      </tr>
    ));
  }

  if (!isLoadingAll && isError) {
    return (
      <tr>
        <td colSpan={totalFields}>
          <ErrorComponent onRefetch={refetch} containerClassName="min-h-52" />
        </td>
      </tr>
    );
  }

  if (isEmpty) {
    return (
      <tr>
        <td colSpan={totalFields}>
          <div className="flex min-h-52 flex-col items-center justify-center">
            <InboxIcon className="size-24 text-gray-400" />
            <span className="text-xs text-gray-400">Sem nenhum registo.</span>
          </div>
        </td>
      </tr>
    );
  }
}
