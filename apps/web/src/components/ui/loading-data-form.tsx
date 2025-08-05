import { ErrorComponent } from '@repo/ui/error-component';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  onReload?(): void;
}
export function LoadingDataForm(props: Props) {
  const { children, isLoading, isError, onReload } = props;

  if (isLoading && !isError) {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

  if (!isLoading && isError) {
    return (
      <ErrorComponent
        title="Oops, algo deu errado ao carregar os dados!"
        onRefetch={onReload}
        containerClassName="h-full"
      />
    );
  }

  return <>{children}</>;
}
