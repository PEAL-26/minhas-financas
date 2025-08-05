import { DefaultValues, FieldValues } from 'react-hook-form';

import { schemaTypes } from '@repo/types';
import { repositories } from '../../repositories';

export type RepositoryName = keyof typeof repositories;
export type SchemaTypes = keyof typeof schemaTypes;

export interface UseMutationProps<TFieldValues extends FieldValues = any> {
  id?: any;
  defaultValues?: DefaultValues<TFieldValues>;
  repositoryName: RepositoryName;
  queryKey?: string[];
  loadingData?: boolean;
  onSuccess?(): void;
  onError?(error: any): void;
}

export interface UseReadProps {
  id?: any;
  repositoryName: RepositoryName;
}

export interface UseDeleteProps {
  repositoryName: RepositoryName;
  queryKey?: string[];
}

export interface UseListAllProps {
  repositoryName: RepositoryName;
  queryKey?: string[];
  search?: string;
}

export interface UseListPaginateProps {
  repositoryName: RepositoryName;
  queryKey?: string[];
  query?: string;
  page?: number;
  size?: number;
  setPage?(page?: number | null): void;
  setSize?(size?: number | null): void;
}
