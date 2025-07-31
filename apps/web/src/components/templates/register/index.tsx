'use client';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { Button, Typography } from '@/libs/material-tailwind';

import Link from 'next/link';
import { LoginFooter } from './footer';
import { useInscreverSeForm } from './use-inscrever-se-form';

export function InscreveSeForm() {
  const { handleSubmit, register, isLoading, errors } = useInscreverSeForm();

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 p-6">
        <Input
          type="text"
          label="Nome"
          error={errors.name?.message}
          {...register('name', { required: 'Campo obrigatório' })}
        />
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
        <div>
          <div className="-ml-2.5 inline-flex items-center">
            <input
              className="border-blue-gray-200 before:bg-blue-gray-500 relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
              {...register('terms', {
                required: 'Tem que concordar com os termos',
              })}
            />
            <label className="flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
              {' Eu concordo com os '}
              <Link href="/termos" target="_blank">
                <span className="ml-1 block font-sans text-sm font-bold leading-normal text-green-500 antialiased">
                  Termos e Condições
                </span>
              </Link>
            </label>
          </div>
          {errors.terms && (
            <Typography variant="small" className="text-red-600">
              {errors.terms.message}
            </Typography>
          )}
        </div>
      </div>
      <LoginFooter>
        <Button
          type="submit"
          variant="gradient"
          color="green"
          fullWidth
          className="flex h-14 items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading && <Loading size={28} />}
          Entrar
        </Button>
      </LoginFooter>
    </form>
  );
}
