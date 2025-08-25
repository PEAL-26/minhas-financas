import '@repo/ui/globals.css';
import '../styles/globals.css';

import type { Metadata, Viewport } from 'next';

import { TopLoader } from '@/components/ui/top-loader';
import { Toaster } from '@repo/ui/sonner';
import { poppins } from './fonts';

interface RootLayoutProps {
  children: React.ReactNode;
}

const APP_NAME = 'Minhas Finanças App';
const APP_DEFAULT_TITLE = 'Minhas Finanças App';
const APP_TITLE_TEMPLATE = '%s | Minhas Finanças App';
const APP_DESCRIPTION =
  'Minhas Finanças é um aplicativo para gerenciar suas finanças pessoais de maneira eficaz.';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang="pt">
      <body className={`${poppins.className} bg-primary antialiased`}>
        <TopLoader />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
