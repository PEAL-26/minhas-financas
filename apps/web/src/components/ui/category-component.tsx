import { colors } from '@repo/ui/colors';
import { IconComponent } from '@repo/ui/icon-component';
import { cn } from '@repo/ui/lib/utils';

interface Props {
  title: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  showIcon?: boolean;
  onClick?(): void;
}

export function CategoryComponent(props: Props) {
  const {
    color,
    icon,
    title,
    description,
    titleClassName,
    descriptionClassName,
    containerClassName,
    showIcon = true,
    onClick,
  } = props;

  return (
    <div className={cn('flex w-full items-center gap-2', containerClassName)} onClick={onClick}>
      {showIcon && (
        <div
          style={{ backgroundColor: color || colors.primary.DEFAULT }}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <IconComponent name={(icon as any) || 'tag'} className="size-4 text-white" />
        </div>
      )}
      <div className="flex flex-col">
        <span className={cn(titleClassName)}>{title}</span>
        {description && (
          <span className={cn('text-[9px] text-gray-400', descriptionClassName)}>
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
