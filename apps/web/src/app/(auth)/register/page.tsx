import { RegisterForm } from '@/components/templates/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar-se',
  description: '',
};

export default function Page() {
  return <RegisterForm />;
}
