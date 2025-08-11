'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';

import { cn } from '../lib/utils';

interface Props extends React.ComponentProps<typeof LabelPrimitive.Root> {
  require?: boolean;
}

function Label({ className, require, children, ...props }: Props) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        'flex select-none items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    >
      {children} {require && <span className="text-red-500">*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
