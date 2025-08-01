'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function LogoutComponent() {
  const router = useRouter();

  useEffect(() => {
    // remover cookies
    router.push('/');
  }, []);

  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <span>Saindo...</span>
    </div>
  );
}
