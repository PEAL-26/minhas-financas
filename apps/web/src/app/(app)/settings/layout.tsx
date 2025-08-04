import { SettingsLayout } from '@/components/layouts/settings';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: 'Geral',
    template: '%s | Configurações',
  },
};

export default function Layout({ children }: LayoutProps) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
