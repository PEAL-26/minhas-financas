'use client';
import { cn } from '@repo/ui/lib/utils';
import { XIcon } from 'lucide-react';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useDebounceValue, useOnClickOutside } from 'usehooks-ts';
import { Button } from '../../button';
import { Input, inputVariants } from '../input';
import { InputSuggestionsItem } from './item';
import { InputSuggestionsProps } from './types';

export function InputSuggestions<T>(props: InputSuggestionsProps<T>) {
  const {
    item,
    className,
    items = [],
    isLoading,
    isError,
    isEmpty,
    onSelectItem,
    renderItem,
    onSearch,
    ...rest
  } = props;

  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [valueDebounce, setValueDebounce] = useDebounceValue('', 300);

  useOnClickOutside(inputRef, (e) => {
    if ((e.target as any).dataset.suggestions) {
      return;
    }

    handleOpenChangeValue(false);
  });

  const handleOpenChangeValue = (state: boolean) => {
    setOpen(state);
  };

  const handleSelect = (item: T, change = true) => {
    setCurrentItem(item);
    handleOpenChangeValue(false);
    inputRef.current?.classList?.add('hidden');
    inputRef.current?.blur?.();
    if (change) {
      onSelectItem?.(item);
    }
  };

  const handleUnselect = ({ open } = { open: true }) => {
    setCurrentItem(null);
    onSelectItem?.(null);

    handleOpenChangeValue(open);
    if (open) {
      inputRef.current?.classList?.remove('hidden');
      inputRef.current?.focus?.();
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value || '';
    setValueDebounce(value);
    rest?.onChange?.(e);
  };

  const handleClickItemSelected = (e?: MouseEvent<HTMLInputElement>) => {
    handleOpenChangeValue(true);
    setValueDebounce('');

    if (e) {
      rest?.onClick?.(e);
    }
  };

  useEffect(() => {
    onSearch?.(valueDebounce);
  }, [valueDebounce]);

  useEffect(() => {
    if (item) {
      handleSelect(item, false);
    } else {
      handleUnselect({ open: false });
    }
  }, [item]);

  return (
    <div className="relative pt-[1px]">
      <div
        className={cn(
          inputVariants({ className }),
          'p-0',
          isFocus ? 'border-ring ring-[1px] ring-ring/50' : '',
        )}
      >
        {currentItem && (
          <div
            className="relative h-full w-full hover:cursor-pointer hover:bg-accent/50"
            onClick={() => handleClickItemSelected()}
          >
            <div className="h-full content-center px-2">{renderItem?.({ item: currentItem })}</div>
            <div className="absolute inset-y-0 right-2 flex items-center justify-center">
              <Button onClick={() => handleUnselect()} className="rounded bg-red-500 text-white">
                <XIcon size={16} />
              </Button>
            </div>
          </div>
        )}
        <Input
          {...rest}
          ref={inputRef}
          value={rest?.value || ''}
          placeholder={currentItem ? '' : rest?.placeholder}
          className={cn(
            className,
            'borer-none h-full w-full border-0 border-transparent bg-transparent py-0 ring-0 focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent',
          )}
          onChange={handleChangeValue}
          onClick={handleClickItemSelected}
          onKeyDown={(e) => {
            rest?.onKeyDown?.(e);
          }}
          onFocus={(e) => {
            setIsFocus(true);
            rest?.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            rest?.onBlur?.(e);
          }}
        />
      </div>
      <div
        data-suggestions="container-main"
        className={cn('absolute inset-x-0 -bottom-2', !open && 'hidden')}
      >
        <div data-suggestions="container-secondary" className="relative">
          <div
            data-suggestions="container-ternary"
            className={cn(
              'absolute inset-x-0 top-0 z-50 max-h-56 overflow-hidden rounded-md border border-border bg-white shadow',
            )}
          >
            <InputSuggestionsItem
              isLoading={isLoading}
              isError={isError}
              isEmpty={isEmpty}
              items={items}
              searchText={valueDebounce}
              renderItem={renderItem}
              onClick={handleSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
