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
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-10 text-center text-3xl font-bold">
            Minhas Finanças
          </h2>
          <div className="flex gap-2">
            <Link href={"/"}>Dashboard</Link>
            <Link href={"/gastos"}>Gastos</Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
