import { cn } from '@repo/ui/lib/utils';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  classNameHeader?: string;
  classNameContent?: string;
}

export function PageLayout(props: Props) {
  const { title, description, classNameContent, classNameHeader, actions, children } = props;
  return (
    <>
      <div className={cn('flex items-end justify-between pb-10', classNameHeader)}>
        {(title || description) && (
          <div className="flex flex-col">
            {title && <h1 className="text-4xl font-bold text-black">{title}</h1>}
            {description && <span className="text-black">{description}</span>}
          </div>
        )}

        {actions && <div>{actions}</div>}
      </div>

      <div className={cn('flex w-full flex-1 flex-col', classNameContent)}>{children}</div>
    </>
  );
}
