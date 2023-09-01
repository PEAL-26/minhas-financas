import { ElementType } from "react";
import { Typography, MenuItem as MTMenuItem } from "@/libs/material-tailwind";

interface MenusItemProps {
  title: string;
  icon?: ElementType;
  onClick(): void;
}

export function MenusItem(props: MenusItemProps) {
  const { title, icon: Icon, onClick } = props;

  return (
    <MTMenuItem className="flex items-center gap-3" onClick={onClick}>
      {Icon && (
        <div className="flex h-6 w-6  items-center  justify-center rounded-full bg-green-600">
          <Icon width={16} className="text-white " />
        </div>
      )}
      <Typography variant="small" className="whitespace-nowrap">
        {title}
      </Typography>
    </MTMenuItem>
  );
}
