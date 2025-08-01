import { keepPreviousData, useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useMemo } from 'react';
//import { useSetQueryStateParams } from '../use-search-params';
import { destructQueryKeys } from './helpers';
import type {
  IQueryPaginationResponse,
  ListResponseData,
  QueryFnContext,
  QueryPaginationProps,
} from './types';

export function useQueryPagination<T>(props: QueryPaginationProps<T>): IQueryPaginationResponse<T> {
  const {
    queryKey,
    fn,
    disableFetch = false,
    enableSetPageParams: enablePageQuerySearchParams = true,
    infiniteQuery = false,
    refetchOnWindowFocus = false,
    onNextPage,
    onPreviewPage,
    setPage,
    setSize,
    ...rest
  } = props;

  const queryFn = async ({ pageParam: page = 1, ...props }: QueryFnContext) => {
    if (disableFetch) return;
    return fn({ page, ...props });
  };

  const select = (data?: InfiniteData<ListResponseData<T> | undefined, number>) => {
    if (!data) return undefined;
    return {
      ...data.pages.slice(-1)[0],
      data: data.pages.flatMap((page) => {
        if (!page?.data) return [];

        return [...page.data];
      }),
    };
  };

  const query = useInfiniteQuery({
    ...rest,
    queryFn,
    queryKey: destructQueryKeys(queryKey),
    initialPageParam: 1,
    getNextPageParam: (data) => data?.next || undefined,
    getPreviousPageParam: (data) => data?.prev || undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus,
    select,
  });

  const {
    data: response,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    promise,
    ...restInfinites
  } = query;

  const isLoadingAll = isLoading || isFetching || isFetchingNextPage || isFetchingPreviousPage;

  const nextPage = async () => {
    if (isLoadingAll) return;
    if (hasNextPage && enablePageQuerySearchParams) {
      setPage?.(response?.next || null);
    }

    if (hasNextPage && infiniteQuery) {
      await fetchNextPage();
    }

    onNextPage?.(response?.next);
  };

  const lastPage = () => {
    if (isLoadingAll) return;
    if (hasNextPage && enablePageQuerySearchParams) {
      setPage?.(response?.totalPages || null);
    }

    onNextPage?.(response?.totalPages);
  };

  const prevPage = async () => {
    if (isLoadingAll) return;
    if (hasPreviousPage && enablePageQuerySearchParams) {
      setPage?.(response?.prev || null);
    }

    if (hasPreviousPage && infiniteQuery) {
      await fetchPreviousPage();
    }

    onPreviewPage?.(response?.prev);
  };

  const firstPage = () => {
    if (isLoadingAll) return;
    if (hasPreviousPage && enablePageQuerySearchParams) {
      setPage?.(1);
    }

    onPreviewPage?.(1);
  };

  const setSizePerPage = (size?: number) => {
    if (isLoadingAll && enablePageQuerySearchParams) return;
    setPage?.(size ? 1 : null);
    setSize?.(size ?? null);
  };

  const { data, ...pagination } = useMemo(() => {
    const { currentPage, totalPages, totalItems, next, prev } = response || {};
    const data = infiniteQuery ? response?.data || [] : isError ? [] : response?.data || [];
    return { currentPage, totalPages, totalItems, next, prev, data };
  }, [response, isError, infiniteQuery]);

  return {
    ...restInfinites,
    ...pagination,
    data,
    isEmpty: !isLoadingAll && !isError && data.length === 0,
    isLoadingAll,
    isLoading,
    isFetching,
    isError,
    nextPage,
    prevPage,
    lastPage,
    firstPage,
    setSizePerPage,
    refetch: async () => {
      await refetch();
    },
  };
}
