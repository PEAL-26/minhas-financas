"use client";
import { CardBody, Button } from "@/libs/material-tailwind";
import { Loading } from "@/components/compounds/loading";
import { Input } from "@/components/compounds/input";

import { LoginFooter } from "./footer";
import { useLoginForm } from "./use-login-form";

export function LoginForm() {
  const { handleSubmit, register, isLoading, errors } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register("email", { required: "Campo obrigatório" })}
        />
        <Input
          type="password"
          label="Senha"
          error={errors.password?.message}
          {...register("password", { required: "Campo obrigatório" })}
        />
      </CardBody>
      <LoginFooter>
        <Button
          type="submit"
          variant="gradient"
          color="green"
          fullWidth
          className="flex h-14 items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <Loading size={28} />}
          Entrar
        </Button>
      </LoginFooter>
    </form>
  );
}
