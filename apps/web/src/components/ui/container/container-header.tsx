import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

export function ContainerHeader(props: ContainerProps) {
  const { title, className, children } = props;

  return (
    <div className={cn('mb-8 flex items-center justify-between p-6', className)}>
      <h6 color="white">{title}</h6>
      {children}
    </div>
  );
}
