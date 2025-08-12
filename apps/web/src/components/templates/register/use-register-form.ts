import { useAuthContext } from '@/contexts/auth';
import { showToastError } from '@repo/ui/helpers/toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

export function useRegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  const { signWithEmailPassword } = useAuthContext();
  const router = useRouter();

  const form = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    if (isSubmitting || isLocking || isSubmitted) return;

    try {
      setIsSubmitting(true);
      setIsLocking(true);
      setIsSubmitted(false);

      await signWithEmailPassword(input);

      setIsSubmitted(true);
      router.push('/dashboard');
    } catch (error) {
      showToastError(error);
    } finally {
      setIsSubmitting(false);
      setIsLocking(false);
    }
  };

  return {
    form,
    isSubmitting,
    isLocking,
    handleSubmit: form.handleSubmit(onSubmit),
    setIsLocking,
  };
}
