import { HeartIcon } from '@repo/ui/lib/lucide';
import Link from 'next/link';

const LINKS = [{ name: 'Github', path: 'https://github.com/PEAL-26/minhas-financas' }];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <span className="font-normal text-inherit">
          &copy; {year}, feito com <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5" /> por
          <Link
            href={'https://github.com/PEAL-26'}
            target="_blank"
            className="transition-colors hover:text-green-600"
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
    </footer>
  );
}

export default Footer;
