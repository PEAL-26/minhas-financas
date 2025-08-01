'use client';
import { ReactNode } from 'react';
import { SidebarMenus } from '../ui/sidebar-menus';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-1 p-4">
      <div className="flex h-full w-52 flex-col justify-between gap-2 py-8 pr-4">
        <div className="flex items-center justify-center">Header</div>
        <SidebarMenus />
        <div>footer (user & notifications)</div>
      </div>

      <div className="h-full w-full flex-1 rounded-[25px] bg-white p-4">{children}</div>
    </div>
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
