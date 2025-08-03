'use client';
import { activeMenu } from '@/helpers/active-menu';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MENUS = [
  { href: '/settings', title: 'Geral', name: 'settings' as const, description: '' },
  { href: '/settings/accounts', title: 'Contas', name: 'accounts' as const, description: '' },
  {
    href: '/settings/categories',
    title: 'Categorias',
    name: 'categories' as const,
    description: '',
  },
];

export type Menu = {
  title: string;
  description?: string;
  name: 'settings' | 'accounts' | 'categories';
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
