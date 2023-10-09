import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "@/libs/material-tailwind";
import { Metadata } from "next";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";

export const metadata: Metadata = {
  title: "Inscrever-se",
  description: "",
};

export default function InscreverSePage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Registo
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Nome" size="md" color="green" />
          <Input type="email" label="Email" size="md" color="green" />
          <Input type="password" label="Senha" size="md" color="green" />
          <div className="-ml-2.5 inline-flex items-center">
            <Checkbox color="green" />
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" color="green" fullWidth className="h-14">
            Inscrever-se
          </Button>
          <Typography variant="small" className="flex justify-center">
            ou
          </Typography>
          <Button
            variant="outlined"
            fullWidth
            className="flex h-14 items-center justify-center gap-2"
          >
            <FcGoogle size={28} />
            Continuar com o Google
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Já tem uma conta?
            <Link href="/login">
              <Typography
                as="span"
                variant="small"
                color="green"
                className="ml-1 font-bold"
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
