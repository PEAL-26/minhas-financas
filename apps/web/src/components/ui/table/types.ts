import { IQueryPaginationResponse } from '@repo/database/hooks/use-query-pagination';
import { ReactNode } from 'react';

export type Entity = { id?: any; [key: string]: any };

export type Field<T> = {
  title: string;
  name?: keyof T;
  className?: string;
  render?(item: T): ReactNode;
};

export interface DataTableProps<T extends Entity> {
  response?: IQueryPaginationResponse<T>;
  fields: Field<T>[];
  className?: string;
  classNameRow?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  onEdit?(item: T): void;
  onDelete?(id: string): void;
}

export interface DataTableRowProps<T extends Entity> {
  fields: Field<T>[];
  data: T;
  className?: string;
  onEdit?(item: T): void;
  onDelete?(id: string): void;
}

export type RenderResponseDataProps<T extends Entity> = Omit<DataTableRowProps<T>, 'data'> & {
  response?: IQueryPaginationResponse<T>;
};

export type RenderFooterProps<T extends Entity> = {
  showFooter?: boolean;
  response?: IQueryPaginationResponse<T>;
  fields: Field<T>[];
  size?: number;
  setSize?(size: number | null): void;
  setPage?(page: number | null): void;
};

export type RenderStatusProps = {
  isLoadingAll?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  totalFields: number;
  refetch?(): Promise<void>;
};
