import { Navbar as MTNavbar } from "@/libs/material-tailwind";

import { Breadcrumbs } from "./breadcrumbs";
import { SidebarMenu } from "./sidebar-menu";
import { Notifications } from "./notifications";

export function Navbar() {
  return (
    <MTNavbar color={"transparent"} fullWidth>
      <div className="flex flex-col justify-between gap-6 lg:flex-row-reverse">
        <div className="flex items-center justify-between">
          <SidebarMenu />
          <Notifications />
        </div>
        <Breadcrumbs />
      </div>
    </MTNavbar>
  );
}
