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
  sizeIcon?: number;
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
    sizeIcon = 32,
    onClick,
  } = props;

  const size = sizeIcon - sizeIcon * 0.5;

  return (
    <div className={cn('flex w-full items-center gap-2', containerClassName)} onClick={onClick}>
      {showIcon && (
        <div
          style={{
            backgroundColor: color || colors.primary.DEFAULT,
            width: sizeIcon,
            height: sizeIcon,
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full"
        >
          <IconComponent
            style={{ width: size, height: size }}
            name={(icon as any) || 'tag'}
            className="size-4 text-white"
          />
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
