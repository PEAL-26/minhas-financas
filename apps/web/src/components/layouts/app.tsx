'use client';
import { SettingsIcon } from '@repo/ui/lib/lucide';
import { Loading } from '@repo/ui/loading';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { AvatarUserDropdownMenu } from '../ui/avatar-user-dropdown-menu';
import { Notifications } from '../ui/notifications';
import { SidebarMenus } from '../ui/sidebar-menus';

export function AppLayout({ children }: { children: ReactNode }) {
  const user = { name: 'Pedro', email: 'edilasio@live.com', avatarUrl: '' };

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="flex h-screen w-screen flex-1 overflow-hidden p-4">
        <div className="flex h-full w-52 flex-col justify-between gap-2 py-4 pr-4">
          {/* HEADER */}
          <div className="relative pt-10">
            {/* Notifications */}
            <div className="absolute left-0 top-0">
              <Notifications />
            </div>

            <div className="absolute right-0 top-0">
              <Link href="/settings" className="relative">
                <SettingsIcon className="h-4 w-4 stroke-white" />
              </Link>
            </div>

            {/* Logo */}
            <Link href="/dashboard" className="flex flex-col items-center justify-center gap-2">
              <Image
                priority
                src="/images/logo-branco-w736.png"
                alt="minhas-finacas-logo-branco"
                width={73.42}
                height={80}
              />
              <span className="font-bold uppercase text-white">Minhas Finanças</span>
            </Link>
          </div>

          {/* MAIN MENUS */}
          <SidebarMenus />

          {/* FOOTER */}
          <div className="mt-2 flex w-full justify-items-end">
            <div className="flex flex-col">
              <div className="flex flex-col gap-3">
                {/* Avatar */}
                <AvatarUserDropdownMenu user={user} />
              </div>
              <div className="flex w-full flex-col">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.split(' ')?.[0] || ''}
                </span>
                <span className="text-xs text-background/80">{user.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full w-full flex-1 overflow-hidden rounded-[25px] bg-white">
          <div className="h-full w-full flex-1 overflow-y-auto p-8">{children}</div>
        </div>
      </div>

      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loading />
        </div>
      )}
    </>
  );
}
