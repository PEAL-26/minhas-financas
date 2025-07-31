import Image from 'next/image';
import Link from 'next/link';

export function HeroInscreverSe() {
  return (
    <div className="mt-8 flex items-center gap-3">
      <Link
        href="/inscrever-se"
        className="rounded-lg bg-white px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-green-500 shadow-md shadow-white/20 transition-all hover:shadow-lg hover:shadow-white/40 focus:opacity-[0.85] focus:shadow active:opacity-[0.85]"
      >
        Inscrever-se
      </Link>
      <div className="flex -space-x-4">
        <Image
          className="h-10 w-10 rounded-full border-2 border-white bg-white dark:border-gray-800"
          src="https://api.multiavatar.com/1.svg"
          alt=""
          height={40}
          width={40}
        />
        <Image
          className="h-10 w-10 rounded-full border-2 border-white bg-white dark:border-gray-800"
          src="https://api.multiavatar.com/2.svg"
          alt=""
          height={40}
          width={40}
        />
        <Image
          className="h-10 w-10 rounded-full border-2 border-white bg-white dark:border-gray-800"
          src="https://api.multiavatar.com/3.svg"
          alt=""
          height={40}
          width={40}
        />
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800"
          href="#"
        >
          +99
        </a>
      </div>
    </div>
  );
}
