'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': '#ffffff',
          '--normal-text': '#1E1E1E',
          '--normal-border': '#e2e8f0',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
