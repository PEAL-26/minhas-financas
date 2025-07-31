import Link from 'next/link';
import { ReactNode } from 'react';

import { LoginGoogleButton } from '@/components/templates/login/login-google-button';
import { CardFooter, Typography } from '@/libs/material-tailwind';

export function LoginFooter({ children }: { children: ReactNode }) {
  return (
    <CardFooter className="pt-0">
      {children}
      <Typography variant="small" className="flex justify-center">
        ou
      </Typography>
      <LoginGoogleButton />
      <Typography variant="small" className="mt-6 flex justify-center">
        Já tem uma conta?
        <Link href="/login">
          <Typography as="span" variant="small" color="green" className="ml-1 font-bold">
            Login
          </Typography>
        </Link>
      </Typography>
    </CardFooter>
  );
}
