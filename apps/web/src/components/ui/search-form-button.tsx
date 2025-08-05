'use client';
import { useQueryStateParams } from '@/hooks/use-search-params';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { SearchIcon } from '@repo/ui/lib/lucide';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { FormEvent, useState } from 'react';

export function SearchFormButton() {
  const [open, setOpen] = useState(false);
  const [qParam, setQParam] = useQueryStateParams('q');
  const [search, setSearch] = useState(() => qParam || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setQParam(search?.trim() || null);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div>
          <Button className="mr-2">
            <SearchIcon className="size-4 text-gray" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent side="left" align="center" className="h-fit w-40 bg-white p-0">
        <form onSubmit={handleSubmit}>
          <div className="relative flex h-full flex-1 flex-col">
            <Input
              name="search"
              value={search}
              onChange={(e) => {
                setSearch((e.target as any)?.value);
              }}
              className="pl-7 text-xs placeholder:text-gray focus:border-0 focus:ring-transparent"
              placeholder="Pesquisar"
            />
            <div className="absolute bottom-0 left-0 top-0 flex w-7 items-center justify-center">
              <SearchIcon className="size-4 text-gray" />
            </div>
          </div>
          <button type="submit" hidden />
        </form>
      </PopoverContent>
    </Popover>
  );
}
