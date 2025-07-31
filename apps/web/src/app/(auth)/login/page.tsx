import { LoginForm } from '@/components/templates/login';
import { CardBody, CardHeader } from '@/components/ui/cards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: '',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4">
      <CardBody className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
        <CardHeader>
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Login
          </h3>
        </CardHeader>
        <LoginForm />
      </CardBody>
    </div>
  );
}
