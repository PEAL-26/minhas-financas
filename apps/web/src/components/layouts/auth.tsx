import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-y-auto p-8">
      <div className="my-auto rounded-[25px] bg-white sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mb-4 mt-6 flex items-center justify-center">
          <Link href="/" className="relative h-20 w-20">
            <Image
              src="/images/mf.png"
              alt="minhas-financas-logo"
              className="h-full w-full object-contain"
              fill
              priority
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
