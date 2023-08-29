import "../styles/globals.css";

import type { Metadata } from "next";
import { Roboto_Flex as Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Minhas Finanças", template: "%s | Minhas Finanças" },
  description: "",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt">
      <body className={`${roboto.className} bg-[#eee]`}>{children}</body>
    </html>
  );
}
