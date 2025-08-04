import { useAuthContext } from '@/contexts/auth';
import { showToastError } from '@repo/ui/helpers/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const router = useRouter();

  const { loginWithEmailPassword } = useAuthContext();

  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (isSubmitting || isLocking || isSubmitted) return;

    try {
      setIsSubmitting(true);
      setIsLocking(true);
      setIsSubmitted(false);

      await loginWithEmailPassword(input);

      setIsSubmitted(true);
      router.replace('./dashboard');
    } catch (error) {
      showToastError(error);
    } finally {
      setIsLocking(false);
      setIsSubmitting(false);
    }
  };

  return { form, isSubmitting, isLocking, handleSubmit: form.handleSubmit(onSubmit), setIsLocking };
}
