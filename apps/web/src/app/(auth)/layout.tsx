import { AuthLayout } from '@/components/layouts/auth';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AuthLayoutProps) {
  return <AuthLayout>{children}</AuthLayout>;
}
