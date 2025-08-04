import Link from 'next/link';

export function HeaderRegister() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="select-none rounded-lg px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-[#616973] transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="select-none rounded-lg bg-green-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Cadastrar-se
      </Link>
    </div>
  );
}
