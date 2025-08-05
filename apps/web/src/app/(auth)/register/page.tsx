import { RegisterForm } from '@/components/templates/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cadastrar-se',
  description: '',
};

export default function Page() {
  return (
    <div>
      <div>
        <h1 className="mb-1 text-center text-2xl font-bold text-black">Cadastra-se</h1>
        <p className="mb-4 text-center text-xs text-gray-400">Crie uma nova conta</p>
      </div>
      <RegisterForm />
    </div>
  );
}
