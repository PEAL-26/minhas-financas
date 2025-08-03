import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isLoading?: boolean;
}
export function LoadingDataForm(props: Props) {
  const { children, isLoading } = props;

  if (isLoading) {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

  return <>{children}</>;
}
