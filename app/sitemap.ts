import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sanjibsantra.dev';
  const now = new Date();

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
