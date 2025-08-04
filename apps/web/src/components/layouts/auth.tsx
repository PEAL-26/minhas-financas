import { ReactNode } from 'react';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-y-auto p-8">
      <div className="my-auto rounded-[25px] bg-white sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>
    </div>
  );
}
