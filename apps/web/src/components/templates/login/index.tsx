'use client';
import { Input } from '@/components/compounds/input';
import { Loading } from '@/components/compounds/loading';

import { LoginFooter } from './footer';
import { useLoginForm } from './use-login-form';

export function LoginForm() {
  const { handleSubmit, register, isLoading, errors } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-6">
        <Input
          type="email"
          label="Email"
          error={errors.email?.message}
          {...register('email', { required: 'Campo obrigatório' })}
        />
        <Input
          type="password"
          label="Senha"
          error={errors.password?.message}
          {...register('password', { required: 'Campo obrigatório' })}
        />
      </div>
      <LoginFooter>
        <button
          className="flex h-14 w-full select-none items-center justify-center gap-2 rounded-lg bg-gradient-to-tr from-green-600 to-green-400 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={isLoading}
        >
          {isLoading && <Loading size={28} />}Entrar
        </button>
      </LoginFooter>
    </form>
  );
}
