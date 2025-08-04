'use client';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import { useAuthContext } from '@/contexts/auth';
import { Button } from '@repo/ui/button';
import { showToastError } from '@repo/ui/helpers/toast';
import { Loader2Icon } from '@repo/ui/lib/lucide';
import { useRouter } from 'next/navigation';

interface Props {
  disabled?: boolean;
  onSubmitting?(isLoading: boolean): void;
}

export function RegisterGoogleButton(props: Props) {
  const { disabled, onSubmitting } = props;
  const { loginWithGoogle } = useAuthContext();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLogin = async () => {
    if (disabled || isLoading || isSubmitted) return;

    try {
      setIsLoading(true);
      setIsSubmitted(false);
      onSubmitting?.(true);
      await loginWithGoogle();

      setIsSubmitted(true);
      router.replace('./dashboard');
    } catch (error) {
      showToastError(error);
    } finally {
      setIsLoading(false);
      onSubmitting?.(false);
    }
  };

  return (
    <Button
      disabled={isLoading || disabled}
      variant="outline"
      size="default"
      className="w-full"
      onClick={handleLogin}
    >
      {isLoading ? <Loader2Icon size={28} className="animate-spin" /> : <FcGoogle size={28} />}
      Continuar com o Google
    </Button>
  );
}
