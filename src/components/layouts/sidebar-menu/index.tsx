"use client";
import { useSidebarContext } from "@/contexts/sidebar-menu-context";
import { IconButton } from "@/libs/material-tailwind";
import { Bars3Icon } from "@heroicons/react/24/solid";

export function SidebarMenu() {
  const { open } = useSidebarContext();

  return (
    <IconButton
      variant="text"
      color="blue-gray"
      className="grid xl:hidden"
      onClick={open}
    >
      <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
    </IconButton>
  );
}
