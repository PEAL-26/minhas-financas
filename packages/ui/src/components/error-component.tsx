import { TriangleAlertIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';

interface Props {
  onRefetch?(): void;
  containerClassName?: string;
  title?: string;
}

export function ErrorComponent(props: Props) {
  const { onRefetch, title = 'Oops, algo deu errado!', containerClassName } = props;
  return (
    <div className={cn('flex flex-col items-center justify-center', containerClassName)}>
      <TriangleAlertIcon className="size-24 text-red-500" />
      <span className="max-w-md text-center text-xs text-gray-400">{title}</span>
      {onRefetch && (
        <Button variant="outline" size="default" className="mt-3" onClick={onRefetch}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
