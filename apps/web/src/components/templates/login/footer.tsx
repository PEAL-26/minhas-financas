import Link from 'next/link';
import { ReactNode } from 'react';

import { LoginGoogleButton } from '@/components/templates/login/login-google-button';

export function LoginFooter({ children }: { children: ReactNode }) {
  return (
    <div className="p-6 pt-0">
      {children}
      <span className="flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
        ou
      </span>
      <LoginGoogleButton />
      <span className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
        Não tem uma conta?
        <Link href="/inscrever-se">
          <span className="ml-1 block font-sans text-sm font-bold leading-normal text-green-500 antialiased">
            Inscrever-se
          </span>
        </Link>
      </span>
    </div>
  );
}
