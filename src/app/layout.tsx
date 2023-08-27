import { Sidebar } from "@/components/sidebar";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Minhas Finanças App",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Sidebar />
        <main className="ml-[260px]">{children}</main>
      </body>
    </html>
  );
}
