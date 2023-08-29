import { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sidebar } from "@/components/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Sidebar />
      <main className="p-4 xl:ml-[260px] ">
        <Navbar />
        {children}
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </main>
    </>
  );
}
