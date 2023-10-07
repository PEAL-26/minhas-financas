import { Spinner } from "@material-tailwind/react";

export function Loading({ size = 48 }: { size?: number }) {
  return <Spinner height={size} width={size} color="green" />;
}
