'use client';

import type { FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { SelectSearch } from '../../../select';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../form';
import type { SelectFormProps } from './types';

export function SelectFormControl<
  T,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: SelectFormProps<T, TFieldValues, TName>) {
  const {
    name,
    control,
    label,
    containerClassName,
    labelClassName,
    disabled,
    description,
    showError = true,
    ...rest
  } = props;

  return (
    <FormField
      disabled={disabled}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={containerClassName}>
          {label && (
            <FormLabel className={cn('font-bold text-black', labelClassName)}>{label}</FormLabel>
          )}
          <FormControl>
            <SelectSearch
              {...rest}
              {...field}
              disabled={disabled}
              item={(field as any)?.location}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
