import { ChangeEvent, ElementType } from 'react';

export interface SetValueOption {
  shouldValidate: boolean;
  shouldDirty: boolean;
  shouldTouch: boolean;
}

export interface SelectSearchProps<T> {
  name?: string;
  onChange?: (event: ChangeEvent<HTMLElement>) => void;
  items?: T[];
  defaultItem?: T;
  placeholder?: string;
  fieldValue?: keyof T;
  fieldLabel?: keyof T;
  setValue?: (name: any, value?: T, options?: Partial<SetValueOption>) => void;
  disabled?: boolean;
  loading?: boolean;
  clean?: boolean;
  className?: string;
  contentClassName?: string;
  contentGroupClassName?: string;
  contentItemClassName?: string;
  listClassName?: string;
  onClean?: (state: false) => void;
  onSearch?: (value: string) => void;
  offlineSearch?: boolean;
  onSelect?: (item: T) => void;
  item?: T;
  modal?: boolean;
}
