'use client';
import { activeMenu } from '@/helpers/active-menu';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MENUS = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/transactions', title: 'Transações' },
  { href: '/incomes', title: 'Rendas' },
  { href: '/expenses', title: 'Despesas' },
  { href: '/wallet', title: 'Carteira' },
  { href: '/wishlist', title: 'Lista de Desejos' },
  // { href: '/settings', title: 'Configurações' },
];

export function SidebarMenus() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col justify-center gap-2 overflow-y-auto">
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
  );
}
