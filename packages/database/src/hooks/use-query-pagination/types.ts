import type { QueryFunctionContext, UseInfiniteQueryResult } from '@tanstack/react-query';

export interface ListRequestParams {
  page?: number;
  size?: number;
  query?: string;
}

export interface ListResponseData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}

export type QueryKey = ReadonlyArray<unknown>;
type TPageParam = number;

export type QueryFnContext = QueryFunctionContext<QueryKey, TPageParam>;
export type FnProps = Omit<QueryFnContext, 'pageParam'> & {
  page: number;
};

export interface QueryPaginationProps<D, R = ListResponseData<D>> {
  queryKey: QueryKey;
  fn: (props: FnProps) => Promise<R>;
  disableFetch?: boolean;
  enableSetPageParams?: boolean;
  infiniteQuery?: boolean;
  refetchOnWindowFocus?: boolean;
  onNextPage?(page?: number | null): void;
  onPreviewPage?(page?: number | null): void;
  setPage?(page?: number | null): void;
  setSize?(size?: number | null): void;
}

type OmitProps = 'data' | 'refetch';
export type IQueryPaginationResponse<TData> = Partial<
  Omit<UseInfiniteQueryResult<TData>, OmitProps>
> & {
  data: TData[];
  isLoading: boolean;
  isLoadingAll: boolean;
  isFetching: boolean;
  isError: boolean;
  isEmpty: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  next?: number | null;
  prev?: number | null;
  nextPage?(): void;
  prevPage?(): void;
  lastPage?(): void;
  firstPage?(): void;
  setSizePerPage?(size?: number): void;
  refetch?(): Promise<void>;
};
