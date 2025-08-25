import { LoginForm } from '@/components/templates/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: '',
};

export default function Page() {
  return (
    <div>
      <div>
        <h1 className="mb-1 text-center text-2xl font-bold text-black">Login</h1>
        <p className="mb-4 text-center text-xs text-gray-400">Entre na sua conta</p>
      </div>
      <LoginForm />
    </div>
  );
}
