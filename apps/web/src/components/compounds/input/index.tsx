import { Input as InputMT } from '@/libs/material-tailwind';
import { forwardRef, HTMLInputTypeAttribute } from 'react';
import { ErrorMessage } from './error-message';

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, type, error, ...rest } = props;

  return (
    <div>
      <InputMT
        ref={ref}
        type={type}
        label={label}
        size="md"
        color="green"
        error={!!error}
        {...rest}
      />
      <ErrorMessage message={error} />
    </div>
  );
});
