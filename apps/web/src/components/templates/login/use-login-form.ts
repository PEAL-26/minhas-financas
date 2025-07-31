import { useAuthContext } from '@/contexts/auth-context';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmailPassword } = useAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (input) => {
    try {
      setIsLoading(true);
      await loginWithEmailPassword(input);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit: handleSubmit(onSubmit), register, errors, isLoading };
}
