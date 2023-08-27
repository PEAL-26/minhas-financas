"use client";
import LinkNext from "next/link";
import { usePathname } from "next/navigation";
import { ElementType, ReactNode } from "react";
import { IconBaseProps } from "react-icons";

interface LinkProps {
  children?: ReactNode;
  href: string;
  className?: string;
  icon?: ElementType<IconBaseProps>;
}

export function Link(props: LinkProps) {
  const { href, children, icon: Icon } = props;
  const pathname = usePathname();
  const linkActive = href == pathname;

  return (
    <LinkNext
      href={href}
      data-active={linkActive}
      className={
        "flex items-center gap-3 rounded px-4 py-3 data-[active=true]:bg-green-500 data-[active=true]:text-white data-[active=false]:hover:bg-gray-100/50 text-[#3c4858]"
      }
    >
      {Icon && <Icon size={24}/>}
      {children}
    </LinkNext>
  );
}
