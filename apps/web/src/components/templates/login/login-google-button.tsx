'use client';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { Loading } from '@/components/ui/loading';
import { useAlertContext } from '@/contexts/alert-context';
import { useAuthContext } from '@/contexts/auth-context';

export function LoginGoogleButton() {
  const { loginWithGoogle } = useAuthContext();
  const { showAlert } = useAlertContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
      showAlert('Erro ao efetuar o login com o Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="flex h-14 w-full select-none items-center justify-center gap-2 rounded-lg border border-gray-900 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? <Loading size={28} /> : <FcGoogle size={28} />}
      Continuar com o Google
    </button>
  );
}
