'use client';
import { PageLayout } from '@/components/layouts/page';
import { SettingsActions } from '@/components/ui/settings-actions';
import { MENUS, Menu, SettingsMenus } from '@/components/ui/settings-menus';
import { activeMenu } from '@/helpers/active-menu';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menu, setMenu] = useState<Menu>({ title: 'Geral', name: 'settings', description: '' });
  const [pageLoading, setPageLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    setPageLoading(false);
  }, []);

  useEffect(() => {
    const _menu = MENUS.find((menu) => activeMenu(menu.href, pathname, false));
    if (_menu) {
      setMenu(_menu);
    }
  }, [pathname]);

  if (pageLoading) {
    return <div className="flex h-full w-full items-center justify-center">Carregando...</div>;
  }

  return (
    <PageLayout
      title={String(menu.title)}
      description={menu?.description}
      actions={<SettingsActions type={menu.name} />}
    >
      <div>
        <SettingsMenus />
        <div>{children}</div>
      </div>
    </PageLayout>
  );
}
