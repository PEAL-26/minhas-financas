import { Button } from '@repo/ui/button';
import { BellIcon, SettingsIcon } from '@repo/ui/lib/lucide';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { AvatarUserDropdownMenu } from '../ui/avatar-user-dropdown-menu';
import { SidebarMenus } from '../ui/sidebar-menus';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-1 overflow-hidden p-4">
      <div className="flex h-full w-52 flex-col justify-between gap-2 py-4 pr-4">
        {/* HEADER */}
        <div className="relative pt-10">
          {/* Notifications */}
          <div className="absolute left-0 top-0">
            <Button className="relative">
              <div className="absolute -top-1 -right-0.5 h-2 w-2 rounded-full bg-red-600" />
              <BellIcon className="h-4 w-4 stroke-white" />
            </Button>
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
              <AvatarUserDropdownMenu />
            </div>
            <div className="flex w-full flex-col">
              <span className="text-2xl font-bold text-white">Pedro</span>
              <span className="text-xs text-background/80">pedro@meuemail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full flex-1 overflow-hidden rounded-[25px] bg-white">
        <div className="h-full w-full flex-1 overflow-y-auto p-8">{children}</div>
      </div>
    </div>
  );
}
