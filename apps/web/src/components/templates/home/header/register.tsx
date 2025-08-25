import { buttonVariants } from '@repo/ui/button';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

export function HeaderRegister() {
  const isAuthenticated = true;

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated ? (
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'outline', size: 'default' }))}
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            //className="select-none rounded-full px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-[#616973] transition-all hover:bg-accent/50 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className={cn(buttonVariants({ variant: 'ghost', size: 'default' }))}
          >
            Login
          </Link>
          <Link
            href="/register"
            //className="shadow-xs select-none rounded-full bg-primary px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:bg-primary/90 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            className={cn(buttonVariants({ variant: 'default', size: 'default' }))}
          >
            Cadastrar-se
          </Link>
        </>
      )}
    </div>
  );
}
