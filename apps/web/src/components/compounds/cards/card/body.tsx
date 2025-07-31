import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardHeaderProps extends HTMLProps<HTMLDivElement> {}

export function CardBody(props: CardHeaderProps) {
  const { children, className, ...rest } = props;

  return (
    <div
      className={twMerge(
        'absolute left-2/4 top-2/4 flex w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
