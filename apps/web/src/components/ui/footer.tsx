import { HeartIcon } from '@repo/ui/lib/lucide';
import Link from 'next/link';

const LINKS = [{ name: 'Github', path: 'https://github.com/PEAL-26/minhas-financas' }];

export function Footer() {
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Minhas Finanças</h3>
            <p className="text-gray-400">
              A solução completa para gerenciar suas finanças pessoais de forma simples e eficiente.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Funcionalidades</li>
              <li>Preços</li>
              <li>Integrações</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>Status</li>
              <li>Comunidade</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Sobre</li>
              <li>Blog</li>
              <li>Carreiras</li>
              <li>Imprensa</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-6 border-t border-gray-300 px-2 pt-4 md:justify-between">
          <span className="text-sm font-normal text-inherit">
            &copy; {new Date().getFullYear()} Minhas Finanças, feito com{' '}
            <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-500" /> por{' '}
            <Link
              href={'https://github.com/PEAL-26'}
              target="_blank"
              className="font-bold transition-colors hover:text-green-600"
            >
              PEAL-26
            </Link>
          </span>
          <ul className="flex items-center gap-4">
            {LINKS.map(({ name, path }) => (
              <li key={name}>
                <Link
                  href={path}
                  target="_blank"
                  className="px-1 py-0.5 font-normal text-inherit transition-colors hover:text-green-600"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
