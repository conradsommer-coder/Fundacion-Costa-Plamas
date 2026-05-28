import type { MetadataRoute } from 'next';
import { getLocalizedPath, supportedLanguages } from '../src/i18n/routes';
import { getSiteUrl, sitemapRoutes } from '../src/seo/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return sitemapRoutes().map((route) => {
    const storyId = 'storyId' in route ? route.storyId : undefined;
    const languages = supportedLanguages.reduce<Record<string, string>>((acc, language) => {
      acc[language] = `${siteUrl}${getLocalizedPath(route.routeKey, language, { storyId })}`;
      return acc;
    }, {
      'x-default': `${siteUrl}${getLocalizedPath(route.routeKey, 'es', { storyId })}`,
    });

    return {
      url: `${siteUrl}${route.path}`,
      changeFrequency: route.routeKey === 'story' ? 'monthly' : 'weekly',
      priority: route.routeKey === 'home' ? 1 : route.routeKey === 'story' ? 0.7 : 0.8,
      alternates: {
        languages,
      },
    };
  });
}
