import { Input, IconButton } from "@/libs/material-tailwind";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function Search() {
  return (
    <div className="flex w-full items-center">
      <Input
        variant="outlined"
        label="Pesquisar"
        color="green"
        className="w-full border-0 ring-0"
      />
      <IconButton
        variant="outlined"
        className="h-10 w-10 rounded-full border-gray-200 hover:shadow"
        onClick={() => {}}
      >
        <MagnifyingGlassIcon />
      </IconButton>
    </div>
  );
}
