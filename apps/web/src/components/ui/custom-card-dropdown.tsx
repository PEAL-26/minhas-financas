import { Button } from '@repo/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
} from '@repo/ui/command';
import { Loader2Icon } from '@repo/ui/lib/lucide';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { useEffect, useState } from 'react';
import { CategoryComponent } from './category-component';

interface Props<T> {
  title?: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  color?: string | null;
  defaultColor?: string;
  icon?: string;
  placeholder?: string;
  items: T[];
  labelField?: keyof T;
  modal?: boolean;
  loading?: boolean;
  offlineSearch?: boolean;
  clean?: boolean;
  onChange?(value: T): void;
  onSearch?(query: string): void;
  onClean?(state: boolean): void;
}

export function CustomCardDropdown<T>(props: Props<T>) {
  const {
    title,
    description,
    color,
    backgroundColor,
    defaultColor,
    borderColor,
    icon,
    placeholder = 'Selecione um item',
    labelField = 'name',
    modal,
    loading,
    items,
    offlineSearch = false,
    clean,
    onClean,
    onChange,
    onSearch,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleChangeOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleChangeItem = (item: T) => {
    onChange?.(item);
    handleChangeOpen(false);
  };

  const handleClean = () => {
    setOpen(false);
    setSearch('');
    handleChangeOpen(false);
  };

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

  return (
    <Popover open={open} onOpenChange={handleChangeOpen} modal={modal}>
      <PopoverTrigger asChild>
        <div>
          <Button
            variant="outline"
            className="h-[36px] w-full justify-start rounded-md px-3 py-1 text-left"
          >
            <CategoryComponent
              title={title || placeholder}
              description={description}
              color={color}
              defaultColor={defaultColor}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
              icon={icon}
              titleClassName={`${!title ? 'text-gray-300 font-light' : ''}`}
              sizeIcon={24}
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="p-0">
        <Command className="w-full" shouldFilter={offlineSearch}>
          <CommandInput
            onValueChange={setSearch}
            placeholder="Pesquisar..."
            className="focus:border-0 focus:border-none focus:ring-0"
          />
          <CommandList>
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
              <CommandGroup>
                {items.map((item, index) => (
                  <CommandItem key={index}>
                    <CategoryComponent
                      title={(item as any)?.[labelField]}
                      description={(item as any)?.description}
                      color={(item as any)?.color}
                      defaultColor={(item as any)?.defaultColor}
                      backgroundColor={(item as any)?.backgroundColor}
                      borderColor={(item as any)?.borderColor}
                      icon={(item as any)?.icon}
                      onClick={() => handleChangeItem(item)}
                    />
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
