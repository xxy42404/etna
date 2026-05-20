import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://etna-paint.com';

const staticRoutes = ['', '/products', '/brand', '/cases', '/colors', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const localePrefix = locale === routing.defaultLocale ? '' : `/${locale}`;

    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}${localePrefix}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
