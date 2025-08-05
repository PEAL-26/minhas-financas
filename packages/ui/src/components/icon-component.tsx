import { LucideIcon, LucideProps } from 'lucide-react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';
import { forwardRef } from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

export const IconComponent = forwardRef<React.ComponentRef<LucideIcon>, IconProps>(
  ({ name, ...props }, ref) => {
    return <DynamicIcon name={name} {...props} ref={ref} />;
  },
);

IconComponent.displayName = 'IconComponent';
