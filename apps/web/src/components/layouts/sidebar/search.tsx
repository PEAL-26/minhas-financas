import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export function Search() {
  return (
    <div className="flex w-full items-center">
      <div className="group relative z-0 w-full">
        <input
          name="pesquisar"
          id="pesquisar"
          className="peer block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 py-1 text-sm text-gray-900 focus:border-green-400 focus:outline-none focus:ring-0"
          placeholder=""
        />
        <label
          htmlFor="pesquisar"
          className="absolute top-1 -z-10 origin-[0] -translate-y-2 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:top-3 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-green-400"
        >
          Pesquisar
        </label>
      </div>
      <div>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white p-1 hover:shadow focus:outline-none focus:ring-0"
          onClick={() => {}}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
