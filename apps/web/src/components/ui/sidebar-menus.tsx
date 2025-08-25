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
    <div className="flex w-full overflow-x-auto md:h-full md:overflow-y-auto">
      <div className="mx-auto flex flex-row gap-1 md:my-auto md:w-full md:flex-col md:gap-2">
        {MENUS.map((menu, index) => (
          <Link
            key={index}
            href={menu.href}
            className={cn(
              'group flex flex-col items-center gap-2 rounded-md p-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary md:flex-row',
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
                //size={16}
                className={cn(
                  'size-5 text-primary transition-all duration-300 group-hover:text-white md:size-4',
                  activeMenu(menu.href, pathname)
                    ? 'text-white group-hover:text-white'
                    : 'text-primary group-hover:text-white',
                )}
              />
            </div>
            <span className="line-clamp-1 text-center text-xs md:text-sm">{menu.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
