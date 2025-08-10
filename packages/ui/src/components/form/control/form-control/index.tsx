'use client';

import type { FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../form';

import type { FormControlProps } from './types';

export function FormControlCustom<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormControlProps<TFieldValues, TName>) {
  const { name, control, label, containerClassName, showError = true, defaultValue, children } = props;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel className="font-bold text-black">{label}</FormLabel>}
          <FormControl>
            <>{children(props)}</>
          </FormControl>
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
