import type { HTMLProps } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface TextareaFormProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends HTMLProps<HTMLTextAreaElement> {
  name: TName;
  control?: Control<TFieldValues>;
  label?: string;
  description?: string;
}
