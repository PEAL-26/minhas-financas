import { ReactNode } from "react";

import { Footer } from "@/components/layouts/footer";
import { Sidebar } from "@/components/layouts/sidebar";
import { Navbar } from "@/components/layouts/navbar";
import { BreadcrumbsProvider } from "@/contexts/breadcrumbs-context";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <BreadcrumbsProvider>
      <Sidebar />
      <main className="p-4 xl:ml-[260px] ">
        <Navbar />
        {children}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </main>
    </BreadcrumbsProvider>
  );
}
