import { cn } from '../lib/utils';

interface Props {
  size?: number;
}

export function Loading(props: Props) {
  const { size = 48 } = props;

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full"
    >
      <div
        style={{ height: size, width: size }}
        className={cn('h-8 w-8 animate-spin rounded-full border-b-2 border-primary')}
      ></div>
    </div>
  );
}
