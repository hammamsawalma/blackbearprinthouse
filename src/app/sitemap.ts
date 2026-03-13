import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://print.blackbear.qa'; // Update with actual domain

  const routes = [
    '', '/about', '/services', '/portfolio', '/shop', '/cart',
    '/checkout', '/contact', '/quote',
  ];

  const locales = ['ar', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
