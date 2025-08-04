import type { HTMLProps } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface InputFormProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends HTMLProps<HTMLInputElement> {
  name: TName;
  control?: Control<TFieldValues>;
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  updateValue?: any;
  description?: string;
  showError?: boolean;
}
