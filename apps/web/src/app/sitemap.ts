import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/register`,
      lastModified: new Date(),
      priority: 0.5,
    },
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
      lastModified: new Date(),
      priority: 0.5,
    },
  ];
}
