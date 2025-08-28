'use client';
import { useQueryStateParams, useSetQueryStateParams } from '@/hooks/use-search-params';
import { Button } from '@repo/ui/button';
import { Input } from '@repo/ui/input';
import { SearchIcon, XIcon } from '@repo/ui/lib/lucide';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { FormEvent, useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

export function SearchFormButton() {
  const [open, setOpen] = useState(false);
  const [qParam, setQParam] = useQueryStateParams('q');
  const setPageParam = useSetQueryStateParams<number>('page', 'int');
  const [search, setSearch] = useState(() => qParam || '');
  const [searchDebounce, setSearchDebounce] = useDebounceValue(() => search || '', 500);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setQParam(search?.trim() || null);
    setOpen(false);
  };

  const handleClear = () => {
    setSearch('');
    setSearchDebounce('');
    setQParam(null);
  };

  useEffect(() => {
    setQParam(searchDebounce?.trim() || null);
    setPageParam(1);
  }, [searchDebounce]);

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
            <div className="absolute bottom-0 left-0 top-0 flex w-7 items-center justify-center">
              <SearchIcon className="size-4 text-gray" />
            </div>
            <Input
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target?.value);
                //setQParam(e.target?.value?.trim() || null);
              }}
              className="pl-7 text-xs placeholder:text-gray focus:border-0 focus:ring-transparent"
              placeholder="Pesquisar"
            />
            {search && (
              <div className="absolute bottom-0 right-0 top-0 flex w-7 items-center justify-center">
                <Button onClick={() => handleClear()} className='rounded bg-red-500'>
                  <XIcon className="size-4 text-white" />
                </Button>
              </div>
            )}
          </div>
          <button type="submit" hidden />
        </form>
      </PopoverContent>
    </Popover>
  );
}
