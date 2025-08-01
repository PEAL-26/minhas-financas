'use client';
import { PageLayout } from '@/components/layouts/page';
import { Menu, SettingsMenus } from '@/components/ui/settings-menus';
import { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menu, setMenu] = useState<Menu>({ title: 'Geral', description: '' });
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    setPageLoading(false);
  }, []);

  if (pageLoading) {
    return <div className="flex h-full w-full items-center justify-center">Carregando...</div>;
  }

  return (
    <PageLayout title={String(menu.title)}>
      <div>
        <SettingsMenus onSelect={setMenu} />
        <div>{children}</div>
      </div>
    </PageLayout>
  );
}
