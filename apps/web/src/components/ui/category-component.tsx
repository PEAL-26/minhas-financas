import { colors } from '@repo/ui/colors';
import { IconComponent } from '@repo/ui/icon-component';
import { cn } from '@repo/ui/lib/utils';

interface Props {
  title: string;
  description?: string | null;
  backgroundColor?: string | null;
  color?: string | null;
  defaultColor?: string;
  borderColor?: string;
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
    icon,
    title,
    description,
    titleClassName,
    descriptionClassName,
    containerClassName,
    backgroundColor,
    borderColor,
    color,
    defaultColor = colors.primary.DEFAULT,
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
            backgroundColor: backgroundColor || defaultColor,
            borderColor: borderColor || 'transparent',
            width: sizeIcon,
            height: sizeIcon,
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border"
        >
          <IconComponent
            style={{ width: size, height: size, color: color || 'white' }}
            name={(icon as any) || 'tag'}
            className="size-4 text-white"
          />
        </div>
      )}
      <div className="flex w-full flex-1 flex-col gap-[2px] leading-none">
        <span className={cn('text-sm font-medium', titleClassName)}>{title}</span>
        {description && (
          <span className={cn('text-[8px] text-gray-400', descriptionClassName)}>
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
