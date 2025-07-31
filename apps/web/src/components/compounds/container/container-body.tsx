import { CardBody } from '@/libs/material-tailwind';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function ContainerBody(props: ContainerProps) {
  const { children, className } = props;

  return (
    <CardBody className={twMerge('w-full overflow-x-auto px-0 pb-2 pt-0', className)}>
      {children}
    </CardBody>
  );
}
