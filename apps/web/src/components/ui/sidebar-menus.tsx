'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { activeMenu } from '@/helpers/active-menu';
import { MAIN_MENUS } from '@repo/constants/menus';
import { cn } from '@repo/ui/lib/utils';

export const MENUS = Object.values(MAIN_MENUS);

export function SidebarMenus() {
  const pathname = usePathname();

  return (
    <div className="flex h-full overflow-y-auto">
      <div className="my-auto flex w-full flex-col gap-2">
        {MENUS.map((menu, index) => (
          <Link
            key={index}
            href={menu.href}
            className={cn(
              'rounded-md p-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary',
              activeMenu(menu.href, pathname) ? 'bg-white text-primary' : '',
            )}
          >
            {menu.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
