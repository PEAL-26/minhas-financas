'use client';
import { useSidebarContext } from '@/contexts/sidebar-menu-context';
import { IconButton } from '@/libs/material-tailwind';
import { XMarkIcon } from '@heroicons/react/24/solid';

export function CloseSideBar() {
  const { close } = useSidebarContext();

  return (
    <>
      <IconButton
        variant="text"
        color="blue-gray"
        className="fixed left-[268px] top-2 z-50 lg:hidden"
        onClick={close}
      >
        <XMarkIcon strokeWidth={3} className="h-6 w-6 text-black" />
      </IconButton>
    </>
  );
}
