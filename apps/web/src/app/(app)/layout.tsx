import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    // <BreadcrumbsProvider>
    //   <SidebarProvider>
    //     <Sidebar />
    <main className="p-4 lg:ml-[260px]">
      {/* <Navbar /> */}
      {children}
      <div className="text-blue-gray-600">{/* <Footer /> */}</div>
    </main>
    //   </SidebarProvider>
    // </BreadcrumbsProvider>
  );
}
