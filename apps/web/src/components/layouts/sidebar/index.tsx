'use client';
import Image from 'next/image';
import LinkNext from 'next/link';
import { useState } from 'react';
import {
  MdFormatListBulleted,
  MdOutlineDashboard,
  MdSwapVert,
  MdTrendingDown,
  MdTrendingUp,
} from 'react-icons/md';
import { cn } from '@repo/ui/lib/utils';

import { useSidebarContext } from '@/contexts/sidebar-menu-context';
import useMediaQuery from '@/hooks/use-media-query';

import { CloseSideBar } from './close-sidebar';
import { Link } from './link';
import { Search } from './search';

const LINKS = [
  { ulr: '/dashboard', title: 'Dashboard', icon: MdOutlineDashboard },
  { ulr: '/transacoes', title: 'Transações', icon: MdSwapVert },
  { ulr: '/rendas', title: 'Rendas', icon: MdTrendingUp },
  { ulr: '/despesas', title: 'Despesas', icon: MdTrendingDown },
  { ulr: '/necessidades', title: 'Necessidades', icon: MdFormatListBulleted },
];

export function Sidebar() {
  const isDevice = useMediaQuery('(max-width: 959px)');
  const { isOpen, close } = useSidebarContext();
  const [className, setClassName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const body = document.body;

  //   // if (isDevice) {
  //   //  open()// setShow(isOpen);

  //   //   if (show) {
  //   //     body.classList.add("overflow-hidden");
  //   //   } else {
  //   //     body.classList.remove("overflow-hidden");
  //   //   }
  //   // } else {
  //   //   setShow(true);
  //   // }

  //   // return () => {
  //   //   setShow(false);
  //   //   body.classList.remove("overflow-hidden");
  //   // };
  // }, [isDevice, isOpen, show]);

  // useEffect(() => {
  //   if (isDevice) close();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const openSidebar = {
    true: 'data-[open=false]:-translate-x-full md:data-[open=true]:translate-x-0 ',
    false: '',
  }[isDevice ? 'true' : 'false'];

  // console.log({ isDevice, openSidebar });

  if (isDevice && isLoading) return null;

  return (
    <div
      onClick={(e) => e.target == e.currentTarget && isDevice && close()}
      data-open={isOpen}
      className={cn(
        'fixed inset-0 z-50 transition-transform duration-300 lg:inset-y-0 lg:w-[260px] lg:translate-x-0',
        openSidebar,
      )}
    >
      <aside
        className={cn(
          'h-full w-[260px] border-r border-r-gray-300/50 bg-white px-4 shadow-lg',
        )}
      >
        <LinkNext
          href="/dashboard"
          className="flex items-center justify-center gap-2 py-4 hover:bg-transparent"
        >
          <Image
            src={'/images/logo-w736.png'}
            height={36}
            width={36}
            alt="logo-minhas-financas"
            className="object-cover"
          />
          <span className="text-center text-xl font-bold text-[#616973]">Minhas Finanças</span>
        </LinkNext>
        <div className="w-full border-t border-t-gray-200" />
        <div className="mt-5 flex min-h-screen flex-col gap-2 overflow-y-auto">
          <Search />
          {LINKS.map((link, index) => (
            <Link key={index} href={link.ulr} icon={link.icon}>
              {link.title}
            </Link>
          ))}
        </div>
      </aside>
      <CloseSideBar />
    </div>
  );
}
