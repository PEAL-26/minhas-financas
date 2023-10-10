import { InscreveSeForm } from "@/components/templates/inscrever-se";
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
        <InscreveSeForm />
      </Card>
    </div>
  );
}
