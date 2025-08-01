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
  { href: '/settings', title: 'Configurações' },
];

export function SidebarMenus() {
  const pathname = usePathname();

  const activeMenu = (href: string) => {
    const className = {
      active: 'bg-white text-primary',
      inactive: '',
    }[pathname !== '/' && pathname.startsWith(href) ? 'active' : 'inactive'];

    return className;
  };

  return (
    <div className="flex flex-col gap-2">
      {MENUS.map((menu, index) => (
        <Link
          key={index}
          href={menu.href}
          className={cn(
            'rounded-md p-2 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary',
            activeMenu(menu.href),
          )}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
}
