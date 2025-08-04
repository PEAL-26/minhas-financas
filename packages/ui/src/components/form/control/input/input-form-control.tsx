'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';
import { Input } from '../../../input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../form';

import { cn } from '../../../../lib/utils';
import type { InputFormProps } from './types';

export function InputFormControl<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: InputFormProps<TFieldValues, TName>) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    name,
    control,
    label,
    type,
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
            <>
              {type === 'password' && (
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...rest}
                    {...field}
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    disabled={disabled}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="text-gray-2 h-5 w-5" />
                    ) : (
                      <EyeIcon className="text-gray-2 h-5 w-5" />
                    )}
                  </button>
                </div>
              )}
              {type !== 'password' && <Input type={type} {...field} {...rest} />}
            </>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {showError && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
