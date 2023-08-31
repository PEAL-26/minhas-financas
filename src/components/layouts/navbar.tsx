import { Navbar as MTNavbar } from "@/libs/material-tailwind";

import { Breadcrumbs } from "./breadcrumbs";
import { SidebarMenu } from "./sidebar-menu";
import { Notifications } from "./notifications";

export function Navbar() {
  return (
    <MTNavbar color={"transparent"} fullWidth>
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <SidebarMenu />
        <Breadcrumbs />
        <Notifications />
      </div>
    </MTNavbar>
  );
}
