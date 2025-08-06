import { colors } from '@repo/ui/colors';
import { IconComponent } from '@repo/ui/icon-component';

interface Props {
  title: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}

export function CategoryComponent(props: Props) {
  const { color, icon, title, description } = props;
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ backgroundColor: color || colors.primary.DEFAULT }}
        className="flex h-8 w-8 items-center justify-center rounded-full"
      >
        <IconComponent name={(icon as any) || 'tag'} className="size-4 text-white" />
      </div>
      <div className="flex flex-col">
        <span>{title}</span>
        {description && <span className="text-[9px] text-gray-400">{description}</span>}
      </div>
    </div>
  );
}
