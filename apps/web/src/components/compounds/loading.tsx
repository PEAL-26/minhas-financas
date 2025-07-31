import { Spinner } from '@/libs/material-tailwind';

export function Loading({ size = 48 }: { size?: number }) {
  return <Spinner height={size} width={size} color="green" />;
}
