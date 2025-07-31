import { HTMLProps } from 'react';
import { cn } from '@repo/ui/lib/utils';

interface CardHeaderProps extends HTMLProps<HTMLDivElement> {}

export function CardHeader(props: CardHeaderProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={cn(
        'relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-green-600 to-green-400 bg-clip-border text-white shadow-lg shadow-green-500/40',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
