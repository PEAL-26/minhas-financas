import '@repo/ui/globals.css';
import '../styles/globals.css';

import type { Metadata } from 'next';

import { TopLoader } from '@/components/ui/top-loader';
import { Providers } from '@/providers';
import { Toaster } from '@repo/ui/sonner';
import { poppins } from './fonts';

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
      <body className={`${poppins.className} bg-primary antialiased`}>
        <TopLoader />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
