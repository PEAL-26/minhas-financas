export function Filtro() {
  return (
    <div className="flex items-center justify-between pb-4">
      <div>
        <button
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
          type="button"
        >
          Last 30 days
        </button>
        <div
          id="dropdownRadio"
          className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
          data-popper-reference-hidden=""
          data-popper-escaped=""
          data-popper-placement="top"
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-700 "
            aria-labelledby="dropdownRadioButton"
          >
            <li>
              <div className="flex items-center p-2 rounded hover:bg-gray-100">
                <input
                  id="filter-radio-example-1"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="filter-radio-example-1"
                  className="w-full ml-2 text-sm font-medium text-gray-900 rounded"
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
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search htmlFor items"
        />
      </div>
    </div>
  );
}
