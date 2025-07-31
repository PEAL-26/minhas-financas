'use client';
import Link from 'next/link';

import { useBreadcrumbsContext } from '@/contexts/breadcrumbs-context';
import { Breadcrumbs as MTBreadcrumbs, Typography } from '@/libs/material-tailwind';

export function Breadcrumbs() {
  const { pages } = useBreadcrumbsContext();

  return (
    <div className="capitalize">
      <MTBreadcrumbs className={`bg-transparent p-0 transition-all`}>
        {pages.map(({ title, url }, index) => {
          if (url && index < pages.length - 1)
            return (
              <Link key={index} href={url}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal opacity-50 transition-all hover:text-green-500 hover:opacity-100"
                >
                  {title}
                </Typography>
              </Link>
            );

          return (
            <Typography key={index} variant="small" color="blue-gray" className="font-normal">
              {title}
            </Typography>
          );
        })}
      </MTBreadcrumbs>
    </div>
  );
}
