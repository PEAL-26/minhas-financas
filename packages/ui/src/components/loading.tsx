import { cn } from '../lib/utils';
import { colors } from '../styles/colors';

interface Props {
  size?: number;
  color?: string;
}

export function Loading(props: Props) {
  const { size = 48, color = colors.primary.DEFAULT } = props;

  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full"
    >
      <div
        style={{ height: size, width: size, borderColor: color }}
        className={cn('h-8 w-8 animate-spin rounded-full border-b-2 border-primary')}
      ></div>
    </div>
  );
}
