import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { SelectSearchProps } from '../../../select';

export interface SelectFormProps<
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends SelectSearchProps<T> {
  name: TName;
  control?: Control<TFieldValues>;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  updateValue?: any;
  description?: string;
  showError?: boolean;
}
