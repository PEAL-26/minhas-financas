import { BsSearch } from 'react-icons/bs';

interface FiltroProps {
  onSearch?(filter: string): void;
}

export function TableFiltro(props: FiltroProps) {
  const { onSearch } = props;

  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        <button
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
          type="button"
        >
          Last 30 days
        </button>
        <div
          id="dropdownRadio"
          className="z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
        >
          <ul className="space-y-1 p-3 text-sm text-gray-700" aria-labelledby="dropdownRadioButton">
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-100">
                <input
                  id="filter-radio-example-1"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="filter-radio-example-1"
                  className="ml-2 w-full rounded text-sm font-medium text-gray-900"
                >
                  Last day
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
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
