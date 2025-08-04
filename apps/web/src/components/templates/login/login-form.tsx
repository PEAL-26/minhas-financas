'use client';
import Link from 'next/link';

import { RegisterGoogleButton } from '@/components/ui/register-google-button';
import { Button } from '@repo/ui/button';
import { Form } from '@repo/ui/form';
import { InputFormControl } from '@repo/ui/form/control/input';
import { cn } from '@repo/ui/lib/utils';

import { Loader2Icon } from '@repo/ui/lib/lucide';
import { useLoginForm } from './use-login-form';

export function LoginForm() {
  const { handleSubmit, setIsLocking, form, isLocking, isSubmitting } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 p-6">
          <InputFormControl
            control={form.control}
            disabled={isLocking}
            type="email"
            label="Email"
            name="email"
          />
          <InputFormControl
            control={form.control}
            disabled={isLocking}
            type="password"
            label="Senha"
            name="password"
          />
        </div>

        <div className="p-6 pt-0">
          <Button
            variant="default"
            size="default"
            disabled={isLocking}
            type="submit"
            className="w-full"
          >
            {isSubmitting && <Loader2Icon size={28} className="animate-spin" />}Entrar
          </Button>
          <span className="my-2 flex justify-center font-sans text-sm font-light leading-normal text-inherit">
            ou
          </span>
          <RegisterGoogleButton disabled={isLocking} onSubmitting={() => setIsLocking(true)} />
          <span className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit">
            Não tem uma conta?
            <Link
              href="/register"
              className={cn(
                'ml-1 text-sm font-bold text-primary',
                isLocking && 'pointer-events-none',
              )}
            >
              Cadastre-se
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
}
