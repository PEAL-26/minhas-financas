'use client';
import LinkNext from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType, ReactNode } from 'react';
import { IconBaseProps } from 'react-icons';
import { cn } from '@repo/ui/lib/utils';

interface LinkProps {
  children?: ReactNode;
  href: string;
  className?: string;
  icon?: ElementType<IconBaseProps>;
}

export function Link(props: LinkProps) {
  const { href, className, children, icon: Icon } = props;
  const pathname = usePathname();

  const activeHome = href === pathname && href === '/';
  const refSearch = activeHome ? href : href.substring(1);
  const linkActive = !!(refSearch && pathname.includes(refSearch));

  return (
    <LinkNext
      href={href}
      data-active={linkActive}
      className={cn(
        'flex items-center gap-3 rounded px-4 py-3 text-[#3c4858] data-[active=true]:bg-green-500 data-[active=true]:text-white data-[active=false]:hover:bg-gray-200/50 data-[active=true]:hover:shadow-green-400',
        className,
      )}
    >
      {Icon && <Icon size={24} />}
      {children}
    </LinkNext>
  );
}
