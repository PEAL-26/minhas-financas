'use client';

import type { FieldPath, FieldValues } from 'react-hook-form';
import { Textarea } from '../../../textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../form';

import type { TextareaFormProps } from './types';

export function TextareaFormControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: TextareaFormProps<TFieldValues, TName>) {
  const { name, control, label, description, ...rest } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="font-bold text-black">{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} {...rest} value={field.value || ''} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
