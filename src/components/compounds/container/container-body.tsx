import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { CardBody } from "@/libs/material-tailwind";

interface ContainerProps {
  children?: ReactNode;
}

export function ContainerBody(props: ContainerProps) {
  const { children } = props;

  return (
    <CardBody className={twMerge("w-full overflow-x-auto px-0 pb-2 pt-0")}>
      {children}
    </CardBody>
  );
}
