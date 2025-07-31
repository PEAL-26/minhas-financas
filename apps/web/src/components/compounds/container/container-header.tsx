import { CardHeader, Typography } from '@/libs/material-tailwind';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

export function ContainerHeader(props: ContainerProps) {
  const { title, className, children } = props;

  return (
    <CardHeader
      variant="gradient"
      color="green"
      className={twMerge('mb-8 flex items-center justify-between p-6', className)}
    >
      <Typography variant="h6" color="white">
        {title}
      </Typography>
      {children}
    </CardHeader>
  );
}
