import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.kanako-moneyadvisor.com';

const ROUTES = [
  '',
  '/about',
  '/services',
  '/services/consultation',
  '/services/course',
  '/services/seminar',
  '/results',
  '/blog',
  '/faq',
  '/glossary',
  '/glossary/quiz',
  '/quiz',
  '/contact',
  '/legal',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.8 : 0.6,
  }));
}
