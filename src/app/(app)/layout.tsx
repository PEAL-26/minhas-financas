import { ReactNode } from "react";
import { Metadata } from "next";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Sidebar } from "@/components/layouts/sidebar";

import { SidebarProvider } from "@/contexts/sidebar-menu-context";
import { BreadcrumbsProvider } from "@/contexts/breadcrumbs-context";
import { VerifyAuth } from "@/contexts/auth-context/auth-verify";

interface AppLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: { default: "Minhas Finanças", template: "%s | Minhas Finanças" },
  description: "",
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <VerifyAuth>
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
    </VerifyAuth>
  );
}
