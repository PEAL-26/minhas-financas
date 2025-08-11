import { ChangeEvent } from 'react';

export interface SetValueOption {
  shouldValidate: boolean;
  shouldDirty: boolean;
  shouldTouch: boolean;
}

export interface SelectSearchProps<T> {
  name?: string;
  items?: T[];
  item?: T;
  defaultItem?: T;
  itemValue?: any;
  placeholder?: string;
  fieldValue?: keyof T;
  fieldLabel?: keyof T;
  disabled?: boolean;
  loading?: boolean;
  clean?: boolean;
  className?: string;
  contentClassName?: string;
  contentGroupClassName?: string;
  contentItemClassName?: string;
  listClassName?: string;
  modal?: boolean;
  offlineSearch?: boolean;
  onClean?: (state: false) => void;
  onChange?: (event: ChangeEvent<HTMLElement>) => void;
  onSearch?: (value: string) => void;
  onSelect?: (item: T) => void;
  setValue?: (name: any, value?: T, options?: Partial<SetValueOption>) => void;
}
