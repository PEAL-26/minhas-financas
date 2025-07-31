import Link from 'next/link';
import { ReactNode } from 'react';

const MENUS = [
  { href: '/dashboard', title: 'Dashboard' },
  { href: '/transactions', title: 'Transações' },
  { href: '/incomes', title: 'Rendas' },
  { href: '/expenses', title: 'Despesas' },
  { href: '/wallet', title: 'Carteira' },
  { href: '/wishlist', title: 'Lista de Desejos' },
  { href: '/settings', title: 'Configurações' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex gap-2">
        {MENUS.map((menu, index) => (
          <Link key={index} href={menu.href}>
            {menu.title}
          </Link>
        ))}
      </div>

      {children}
    </>
  );
}

/*
 // <BreadcrumbsProvider>
    //   <SidebarProvider>
    //     <Sidebar />
    <main className="p-4 lg:ml-[260px]">
      <Navbar /> 
      {children}
      <div className="text-blue-gray-600">{<Footer />}</div>
    </main>
    //   </SidebarProvider>
    // </BreadcrumbsProvider>
*/
