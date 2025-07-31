import { Navbar as MTNavbar } from '@/libs/material-tailwind';

import { Breadcrumbs } from './breadcrumbs';
import { Notifications } from './notifications';
import { SidebarMenuButton } from './sidebar-menu-button';
import { UserMenu } from './user-menu';

export function Navbar({}) {
  return (
    <MTNavbar color={'transparent'} fullWidth>
      <div className="flex flex-col justify-between gap-6 lg:flex-row-reverse">
        <div className="flex items-center justify-between">
          <SidebarMenuButton />
          <div className="flex items-center">
            <UserMenu />
            <Notifications />
          </div>
        </div>
        <Breadcrumbs />
      </div>
    </MTNavbar>
  );
}
