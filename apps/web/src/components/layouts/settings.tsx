'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import { activeMenu } from '@/helpers/active-menu';
import { Loading } from '@repo/ui/loading';
import { SettingsActions } from '../ui/settings-actions';
import { MENUS, Menu, SettingsMenus } from '../ui/settings-menus';
import { PageLayout } from './page';

interface LayoutProps {
  children: ReactNode;
}

export function SettingsLayout({ children }: LayoutProps) {
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
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading />
      </div>
    );
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
