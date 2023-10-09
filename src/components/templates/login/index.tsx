"use client";
import { ReactNode } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardBody, Checkbox, Input } from "@/libs/material-tailwind";

type Inputs = {
  email: string;
  password: string;
  remember: boolean;
};

export function LoginForm({ children }: { children: ReactNode }) {
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
      console.log(input);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email"
          size="md"
          color="green"
          {...register("email")}
        />
        <Input
          type="password"
          label="Senha"
          size="md"
          color="green"
          {...register("password")}
        />
        <div className="-ml-2.5">
          <Checkbox
            label="Lembrar-me"
            color="green"
            {...register("remember")}
          />
        </div>
      </CardBody>
      {children}
    </form>
  );
}
