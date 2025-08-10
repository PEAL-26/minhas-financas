import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

export function PageLayout(props: Props) {
  const { title, description, contentClassName, headerClassName, actions, children } = props;
  return (
    <>
      {(title || description || actions) && (
        <div className={cn('flex items-end justify-between pb-10', headerClassName)}>
          {(title || description) && (
            <div className="flex flex-col gap-1">
              {title && <h1 className="text-4xl font-bold text-black">{title}</h1>}
              {description && <span className="text-sx text-gray-600">{description}</span>}
            </div>
          )}

          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className={cn('flex w-full flex-1 flex-col', contentClassName)}>{children}</div>
    </>
  );
}
