'use client';
import { Button } from '@repo/ui/button';
import { SearchIcon } from '@repo/ui/lib/lucide';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';

export function SearchFormButton() {


  
  return (
    <Popover open>
      <PopoverTrigger asChild>
        <Button className="mr-2">
          <SearchIcon className="size-4 text-gray" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-96 w-80 bg-red-500 p-0" >
        <div className="flex h-full flex-1 flex-col">
        
        </div>
      </PopoverContent>
    </Popover>
  );
}
