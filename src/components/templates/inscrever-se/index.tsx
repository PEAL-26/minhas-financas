"use client";
import {
  CardBody,
  Button,
  Checkbox,
  Typography,
} from "@/libs/material-tailwind";
import { Loading } from "@/components/compounds/loading";
import { Input } from "@/components/compounds/input";

import { LoginFooter } from "./footer";
import { useInscreverSeForm } from "./use-inscrever-se-form";
import Link from "next/link";

export function InscreveSeForm() {
  const { handleSubmit, register, isLoading, errors } = useInscreverSeForm();

  return (
    <form onSubmit={handleSubmit}>
      <CardBody className="flex flex-col gap-4">
        <Input
          type="text"
          label="Nome"
          error={errors.name?.message}
          {...register("name", { required: "Campo obrigatório" })}
        />
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
        <div>
          <div className="-ml-2.5 inline-flex items-center">
            <Checkbox
              color="green"
              {...register("terms", {
                required: "Tem que concordar com os termos",
              })}
            />
            <Typography variant="small" className="flex justify-center">
              Eu concordo com os
              <Link href="/termos" target="_blank">
                <Typography
                  as="span"
                  variant="small"
                  color="green"
                  className="ml-1 font-bold"
                >
                  Termos e Condições
                </Typography>
              </Link>
            </Typography>
          </div>
          {errors.terms && (
            <Typography variant="small" className="text-red-600">
              {errors.terms.message}
            </Typography>
          )}
        </div>
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
