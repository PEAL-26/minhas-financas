import { LoginForm } from '@/components/templates/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: '',
};

export default function Page() {
  return <LoginForm />;
}
