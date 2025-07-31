import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';

interface ContainerProps {
  children?: ReactNode;
  className?: string;
}

export function ContainerBody(props: ContainerProps) {
  const { children, className } = props;

  return <div className={cn('w-full overflow-x-auto px-0 pb-2 pt-0', className)}>{children}</div>;
}
