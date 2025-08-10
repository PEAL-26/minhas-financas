import { forwardRef } from 'react';
import { RxCaretSort } from 'react-icons/rx';

import { cn } from '../../lib/utils';
import { ButtonProps } from '../button';

interface SelectSearchButtonProps extends ButtonProps {
  selectedFieldLabel: string;
  placeholder?: string;
}

export const SelectSearchButton = forwardRef<HTMLButtonElement, SelectSearchButtonProps>(
  (props, ref) => {
    const { selectedFieldLabel, placeholder = '', className, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          'border-gray-light flex w-full items-center justify-between rounded-md border text-sm focus:outline-none focus:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50',
          !selectedFieldLabel && 'text-gray-300',
          className,
        )}
        {...rest}
      >
        <span className="line-clamp-1 w-full overflow-x-hidden text-left">
          {selectedFieldLabel?.trim() ? `${selectedFieldLabel}` : placeholder}
        </span>
        <RxCaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
    );
  },
);

SelectSearchButton.displayName = 'SelectSearchButton';
