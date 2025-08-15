'use client';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Item } from './item';

interface Props<T> {
  modal?: boolean;
  defaultItemsSelected?: T[];
  itemsValuesSelected?: string[];
  items?: T[];
  fieldLabel?: keyof T;
  fieldValue?: keyof T;
  placeholder?: string;
  onChangeItems?(items: T[]): void;
  onRemoveItems?(): void;
  onSelectedItem?(item: T): void;
}

export function MultiSelect<T>(props: Props<T>) {
  const {
    modal,
    items = [],
    defaultItemsSelected,
    itemsValuesSelected,
    fieldLabel = 'name' as keyof T,
    fieldValue = 'id' as keyof T,
    placeholder = 'Selecione alguns itens',
    onChangeItems,
    onRemoveItems,
    onSelectedItem,
  } = props;

  const valuesToItemMap = (values: any[]) => {
    const data = values
      .map((value) => {
        const item = items.find((i) => String(i[fieldValue]) === value);
        if (item) {
          return item;
        }

        return null;
      })
      .filter((item) => item !== null);

    return data as T[];
  };

  const [itemsSelected, setItemsSelected] = useState<T[]>(() => {
    if (itemsValuesSelected && itemsValuesSelected.length > 0) {
      return valuesToItemMap(itemsValuesSelected);
    }

    if (defaultItemsSelected && defaultItemsSelected.length > 0) {
      return defaultItemsSelected;
    }

    return [];
  });

  const handleRemove = (value: string) => {
    const newItems = itemsSelected.filter((item) => String(item[fieldValue]) !== String(value));

    setItemsSelected(newItems);

    handleChangeItems(newItems);
    onRemoveItems?.();
  };

  const handleSelect = (item: T) => {
    const founded = itemsSelected.find((i) => String(i[fieldValue]) === String(item[fieldValue]));
    if (founded) return;

    setItemsSelected((prev) => [...prev, item]);

    handleChangeItems([...itemsSelected, item]);
    onSelectedItem?.(item);
  };

  const handleChangeItems = (items: T[]) => {
    onChangeItems?.(items);
  };

  const unselected = itemsSelected.length === 0;

  return (
    <Popover modal={modal}>
      <PopoverTrigger className="w-full">
        <div className="flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input px-3 py-1 text-sm transition-all duration-300">
          {unselected && <span className="text-gray-300">{placeholder}</span>}
          {itemsSelected.map((item, index) => (
            <Item
              key={index}
              text={String(item[fieldLabel])}
              onRemove={() => handleRemove(String(item[fieldValue]))}
            />
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-full">
        <Command>
          <CommandInput placeholder="Pesquisar..." className="focus:border-0 focus:ring-0" />
          <CommandList>
            <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={`${item[fieldValue]}`}
                  value={String(item[fieldLabel])}
                  onSelect={() => handleSelect(item)}
                >
                  <CheckIcon
                    className={cn(
                      'h-4 w-4',
                      itemsSelected.find((i) => i[fieldValue] === item[fieldValue])
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <span>{`${item[fieldLabel]}`}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
