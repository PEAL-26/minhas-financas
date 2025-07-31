import { Typography } from '@/libs/material-tailwind';

export function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <Typography variant="small" className="text-red-600">
      {message}
    </Typography>
  );
}
