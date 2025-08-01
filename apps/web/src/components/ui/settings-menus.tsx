'use client';
import { activeMenu } from '@/helpers/active-menu';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const MENUS = [
  { href: '/settings', title: 'Geral' },
  { href: '/settings/accounts', title: 'Contas' },
  { href: '/settings/categories', title: 'Categorias' },
];

export type Menu = { title: string; description?: string };

interface Props {
  onSelect?(menu: Menu): void;
}

export function SettingsMenus(props: Props) {
  const { onSelect } = props;
  const pathname = usePathname();

  const handleSelect = (menu: Menu) => {
    onSelect?.(menu);
  };

  useEffect(() => {
    const menu = MENUS.find((menu) => activeMenu(menu.href, pathname, false));
    if (menu) {
      handleSelect(menu);
    }
  }, []);

  return (
    <div className="flex h-full gap-2 pb-5">
      {MENUS.map((menu, index) => (
        <Link
          key={index}
          href={menu.href}
          onClick={() => handleSelect(menu)}
          className={cn(
            'rounded-md p-2 text-base font-medium text-black transition-all duration-300 hover:bg-white hover:text-primary',
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
