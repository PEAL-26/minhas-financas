import { Button } from '@repo/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { useState } from 'react';
import { CategoryComponent } from './category-component';

interface Props<T> {
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
  placeholder?: string;
  items: T[];
  labelField?: keyof T;
  modal?: boolean;
  onChange?(value: T): void;
}

export function CustomCardDropdown<T>(props: Props<T>) {
  const {
    title,
    description,
    color,
    icon,
    placeholder = 'Selecione um item',
    labelField = 'name',
    modal,
    onChange,
  } = props;

  const [open, setOpen] = useState(false);

  const handleChangeOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleChangeItem = (item: T) => {
    onChange?.(item);
    handleChangeOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={handleChangeOpen} modal={modal}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="min-h-[42px] w-full justify-start rounded-md px-3 py-1 text-left"
          >
            <CategoryComponent
              title={title || placeholder}
              description={description}
              color={color}
              icon={icon}
              titleClassName={`${!title ? 'text-gray-300 font-light' : ''}`}
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Type a command or search..."
            className="max-h-60 overflow-y-auto focus:border-0 focus:border-none focus:ring-0"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {props.items.map((item, index) => (
                <CommandItem key={index}>
                  <CategoryComponent
                    title={(item as any)?.[labelField]}
                    description={(item as any)?.description}
                    color={(item as any)?.color}
                    icon={(item as any)?.icon}
                    onClick={() => handleChangeItem(item)}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
