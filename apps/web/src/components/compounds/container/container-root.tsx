import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function ContainerRoot(props: ContainerProps) {
  const { className, children } = props;

  return (
    <div className="mb-8 mt-12 flex w-full flex-col gap-12">
      <div className={cn('', className)}>{children}</div>
    </div>
  );
}
