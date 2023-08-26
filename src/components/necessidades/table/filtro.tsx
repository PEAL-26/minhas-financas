import { BsSearch } from "react-icons/bs";

interface FiltroProps {
  onSearch?(filter: string): void;
}

export function Filtro(props: FiltroProps) {
  const { onSearch } = props;

  return (
    <div className="flex items-center justify-between pb-4">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <BsSearch className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          id="table-search"
          className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Pesquisar"
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
