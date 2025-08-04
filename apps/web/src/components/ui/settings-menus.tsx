'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { activeMenu } from '@/helpers/active-menu';
import { SETTINGS_MENUS } from '@repo/constants/menus';
import { cn } from '@repo/ui/lib/utils';

export const MENUS = Object.values(SETTINGS_MENUS);

export type Menu = {
  title: string;
  description?: string;
  name: 'settings' | 'accounts' | 'categories' | 'locations';
};

interface Props {}

export function SettingsMenus(props: Props) {
  const {} = props;
  const pathname = usePathname();

  return (
    <div className="flex h-full gap-2 pb-5">
      {MENUS.map((menu, index) => (
        <Link
          key={index}
          href={menu.href}
          className={cn(
            'p-2 text-base font-medium text-black transition-all duration-300 hover:bg-white hover:text-primary',
            activeMenu(menu.href, pathname, false)
              ? 'border-b border-primary bg-white text-primary'
              : '',
          )}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
}
