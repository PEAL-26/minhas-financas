import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

export function useInscreverSeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { signWithEmailPassword } = useAuthContext();
  const router = useRouter();

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
      await signWithEmailPassword(input);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isLoading,
  };
}
