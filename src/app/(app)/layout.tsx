import { ReactNode } from "react";
import { Metadata } from "next";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Sidebar } from "@/components/layouts/sidebar";

import { SidebarProvider } from "@/contexts/sidebar-menu-context";
import { BreadcrumbsProvider } from "@/contexts/breadcrumbs-context";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
      <BreadcrumbsProvider>
        <SidebarProvider>
          <Sidebar />
          <main className="p-4 lg:ml-[260px] ">
            <Navbar />
            {children}
            <div className="text-blue-gray-600">
              <Footer />
            </div>
          </main>
        </SidebarProvider>
      </BreadcrumbsProvider>
  );
}
