import '../styles/globals.css';

import type { Metadata } from 'next';
import { Roboto_Flex as Roboto } from 'next/font/google';

import { Providers } from '@/providers';

const roboto = Roboto({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Minhas Finanças', template: '%s | Minhas Finanças' },
  description: '',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="pt">
      <body suppressHydrationWarning={true} className={`${roboto.className} bg-[#eee]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
