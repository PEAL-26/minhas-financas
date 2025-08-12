'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { activeMenu } from '@/helpers/active-menu';
import { MAIN_MENUS } from '@repo/constants/menus';
import { IconComponent } from '@repo/ui/icon-component';
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
              'group flex items-center gap-2 rounded-md p-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary',
              activeMenu(menu.href, pathname) ? 'bg-white text-primary' : '',
            )}
          >
            <div
              className={cn(
                'rounded-md bg-white p-1 group-hover:bg-primary',
                activeMenu(menu.href, pathname)
                  ? 'bg-primary group-hover:bg-primary'
                  : 'bg-white group-hover:bg-primary',
              )}
            >
              <IconComponent
                name={menu.icon as any}
                size={16}
                className={cn(
                  'text-primary transition-all duration-300 group-hover:text-white',
                  activeMenu(menu.href, pathname)
                    ? 'text-white group-hover:text-white'
                    : 'text-primary group-hover:text-white',
                )}
              />
            </div>
            {menu.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
