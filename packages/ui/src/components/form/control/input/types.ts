import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { InputProps } from '../../../input';

export interface InputFormProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends InputProps {
  name: TName;
  control?: Control<TFieldValues>;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  updateValue?: any;
  description?: string;
  showError?: boolean;
}
