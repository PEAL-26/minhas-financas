'use client';
import { useSidebarContext } from '@/contexts/sidebar-menu-context';
import { IconButton } from '@/libs/material-tailwind';
import { Bars3Icon } from '@heroicons/react/24/solid';

export function SidebarMenuButton() {
  const { open } = useSidebarContext();

  return (
    <IconButton variant="text" color="blue-gray" className="grid lg:hidden" onClick={open}>
      <Bars3Icon strokeWidth={3} className="text-blue-gray-500 h-6 w-6" />
    </IconButton>
  );
}
