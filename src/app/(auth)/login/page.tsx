import { LoginForm } from "@/components/templates/login";
import { LoginGoogleButton } from "@/components/templates/login/login-google-button";
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

export const metadata: Metadata = {
  title: "Login",
  description: "",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
        <CardHeader
          variant="gradient"
          color="green"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <LoginForm>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              color="green"
              fullWidth
              className="h-14"
            >
              Entrar
            </Button>
            <Typography variant="small" className="flex justify-center">
              ou
            </Typography>
            <LoginGoogleButton />
            <Typography variant="small" className="mt-6 flex justify-center">
              Não tem uma conta?
              <Link href="/inscrever-se">
                <Typography
                  as="span"
                  variant="small"
                  color="green"
                  className="ml-1 font-bold"
                >
                  Inscrever-se
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </LoginForm>
      </Card>
    </div>
  );
}
