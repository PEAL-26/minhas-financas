import { Input, IconButton } from "@/libs/material-tailwind";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export function Search() {
  return (
    <div className="flex w-full items-center">
      <input
        placeholder="Pesquisar"
        color="green"
        className="w-full border-b border-b-gray-300 outline-none ring-0"
      />
      <button
        className="rounded-full border border-gray-200 p-1 hover:shadow"
        onClick={() => {}}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </button>
    </div>
  );
}
