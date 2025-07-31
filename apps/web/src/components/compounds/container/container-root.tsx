import { Card } from '@/libs/material-tailwind';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function ContainerRoot(props: ContainerProps) {
  const { className, children } = props;

  return (
    <div className="mb-8 mt-12 flex w-full flex-col gap-12">
      <Card className={twMerge('', className)}>{children}</Card>
    </div>
  );
}
