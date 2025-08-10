'use client';
import { Loader2Icon } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { LuCheck } from 'react-icons/lu';

import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { SelectSearchButton } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from './command';
import { SelectSearchProps } from './types';

export function SelectSearch<T>(props: SelectSearchProps<T>) {
  const {
    name,
    items = [],
    item,
    placeholder = 'Selecione um item...',
    setValue,
    fieldValue = 'id' as keyof T,
    fieldLabel = 'name' as keyof T,
    disabled = false,
    loading = false,
    clean = false,
    className,
    contentClassName,
    contentGroupClassName,
    contentItemClassName,
    listClassName,
    onChange,
    onClean,
    onSearch,
    offlineSearch = false,
    onSelect,
    modal,
  } = props;

  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);

  const [search, setSearch] = useState('');

  useEffect(() => {
    onSearch?.(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (clean) {
      handleClean();
      onClean?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clean]);

  const handleSelect = (item?: T, update = true) => {
    const obj: Record<any, any> = {};
    setOpen(false);
    setSearch('');
    setSelectedItem(item);

    if (name) {
      setValue?.(name, item);
    }

    if (update && item) {
      obj[fieldValue] = item[fieldValue];
      obj[fieldLabel] = item[fieldLabel];
      onSelect?.(item);
      handleChange(obj);
    }
  };

  const handleClean = () => {
    setValue?.(name, undefined);
    setOpen(false);
    setSearch('');
    setSelectedItem(undefined);
    onSelect?.({} as T);
    handleChange();
  };

  const handleChange = (value?: Record<any, any>) => {
    const event = {
      target: { value },
      currentTarget: { value },
    } as unknown as ChangeEvent<HTMLElement>;

    onChange?.(event);
  };

  useEffect(() => {
    handleSelect(item, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <Popover
      modal={modal}
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSearch('');
        }
      }}
    >
      <PopoverTrigger
        disabled={disabled}
        asChild
        className={cn('h-[36px] w-[200px] bg-background px-3 py-2', className)}
      >
        <SelectSearchButton
          selectedFieldLabel={String(selectedItem?.[fieldLabel] || '')}
          placeholder={placeholder}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        ref={popoverRef}
        collisionPadding={{ top: 66 }}
        className={cn('w-full bg-white p-0', contentClassName)}
      >
        <Command shouldFilter={offlineSearch}>
          <CommandInput
            onValueChange={setSearch}
            placeholder="Pesquisar..."
            className="focus:border-0 focus:ring-0"
          />
          <CommandList className={cn(listClassName)}>
            {loading && (
              <CommandLoading className="flex justify-center py-6">
                <Loader2Icon className="size-4 animate-spin" />
              </CommandLoading>
            )}
            {offlineSearch && <CommandEmpty>Nenhum item encontrado.</CommandEmpty>}
            {!offlineSearch && !loading && items.length == 0 && (
              <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            )}
            {!loading && (
              <CommandGroup className={cn(contentGroupClassName)}>
                {items.map((item) => (
                  <CommandItem
                    key={`${item[fieldValue]}`}
                    value={String(item[fieldLabel])}
                    onSelect={() => handleSelect(item)}
                    className={cn(contentItemClassName)}
                  >
                    <LuCheck
                      className={cn(
                        'mr-2 h-4 w-4',
                        item[fieldValue] === selectedItem?.[fieldValue]
                          ? 'opacity-100'
                          : 'opacity-0',
                      )}
                    />
                    <span>{`${item[fieldLabel]}`}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
