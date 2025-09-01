import { ReactNode } from 'react';
import { InputProps } from '../types';

interface RenderItemProps<T> {
  item: T;
}

export type InputSuggestionsProps<T> = InputProps & {
  labelField?: keyof T;
  valueField?: keyof T;
  item?: T;
  items?: T[];
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  onSelectItem?(item: T | null): void;
  renderItem?(props: RenderItemProps<T>): ReactNode;
  onSearch?(text: string): void;
};

export type InputSuggestionsItemProps<T> = {
  items?: T[];
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  searchText?: string;
  renderItem?(props: RenderItemProps<T>): ReactNode;
  onClick?(item: T): void;
};
