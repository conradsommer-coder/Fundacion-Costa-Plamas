import type { Metadata } from 'next';
import en from '../i18n/resources/en';
import es from '../i18n/resources/es';
import {
  getLocalizedPath,
  getStoryIdFromSlug,
  getStorySlug,
  localizedPaths,
  storySlugs,
  supportedLanguages,
  type Language,
  type RouteKey,
} from '../i18n/routes';

type StaticRouteKey = Exclude<RouteKey, 'story'>;

type LocalizedSeo = Record<Language, {
  title: string;
  description: string;
}>;

export const siteName = 'Fundacion Costa Palmas';
export const defaultOgImage = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292722/SANTIAGO_CLEANUP-39_nf45u6.jpg';

export const siteUrlEnvVar = 'NEXT_PUBLIC_SITE_URL';

export const getSiteUrl = () => {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000';
  const withProtocol = /^https?:\/\//.test(configuredUrl)
    ? configuredUrl
    : `https://${configuredUrl}`;

  return withProtocol.replace(/\/+$/, '');
};

export const getSiteUrlObject = () => new URL(getSiteUrl());

export const pageSeo: Record<StaticRouteKey, LocalizedSeo> = {
  home: {
    es: {
      title: 'Fundacion Costa Palmas | Comunidad y Conservacion',
      description: 'Fundacion Costa Palmas impulsa educacion, salud, conservacion ambiental y bienestar comunitario en Cabo del Este, Baja California Sur.',
    },
    en: {
      title: 'Fundacion Costa Palmas | Community and Conservation',
      description: 'Fundacion Costa Palmas advances education, health, environmental conservation, and community well-being in Cabo del Este, Baja California Sur.',
    },
  },
  about: {
    es: {
      title: 'Nosotros | Fundacion Costa Palmas',
      description: 'Conoce la historia, el equipo, los valores y los aliados que impulsan el trabajo de Fundacion Costa Palmas en Cabo del Este.',
    },
    en: {
      title: 'About Us | Fundacion Costa Palmas',
      description: 'Learn about the story, team, values, and partners behind Fundacion Costa Palmas work in Cabo del Este.',
    },
  },
  programs: {
    es: {
      title: 'Programas | Fundacion Costa Palmas',
      description: 'Programas de educacion, medio ambiente, salud integral y espacios comunitarios que fortalecen a Cabo del Este.',
    },
    en: {
      title: 'Programs | Fundacion Costa Palmas',
      description: 'Education, environment, comprehensive health, and community space programs strengthening Cabo del Este.',
    },
  },
  stories: {
    es: {
      title: 'Historias de Impacto | Fundacion Costa Palmas',
      description: 'Historias reales de impacto comunitario, educacion, salud y conservacion ambiental en Cabo del Este.',
    },
    en: {
      title: 'Impact Stories | Fundacion Costa Palmas',
      description: 'Real stories of community impact, education, health, and environmental conservation in Cabo del Este.',
    },
  },
  donate: {
    es: {
      title: 'Donar | Fundacion Costa Palmas',
      description: 'Apoya los programas de Fundacion Costa Palmas y contribuye al bienestar de las comunidades de Cabo del Este.',
    },
    en: {
      title: 'Donate | Fundacion Costa Palmas',
      description: 'Support Fundacion Costa Palmas programs and contribute to the well-being of Cabo del Este communities.',
    },
  },
  contact: {
    es: {
      title: 'Contacto | Fundacion Costa Palmas',
      description: 'Contacta a Fundacion Costa Palmas para colaborar, donar, ser voluntario o conocer mas sobre sus programas.',
    },
    en: {
      title: 'Contact | Fundacion Costa Palmas',
      description: 'Contact Fundacion Costa Palmas to collaborate, donate, volunteer, or learn more about its programs.',
    },
  },
};

export const storyImages: Record<string, string> = {
  'proteccion-palmar': 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
  'diagnostico-corazon': 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Corazon-de-nin%CC%83o-Enero-14_hiedwq.jpg',
  'becas-uabcs': 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195691/DSC02253_e2kb92.jpg',
  'campana-vacunacion': 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
};

const storyPublishedDates: Record<string, string> = {
  'proteccion-palmar': '2025-04-17',
  'diagnostico-corazon': '2026-05-08',
  'becas-uabcs': '2026-05-08',
  'campana-vacunacion': '2025-04-17',
};

const storyResources = { es, en };

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const truncate = (value: string, maxLength = 155) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
};

const absoluteUrl = (path: string) => `${getSiteUrl()}${path}`;

const languageAlternates = (routeKey: RouteKey, storyId?: string) => (
  supportedLanguages.reduce<Record<string, string>>((acc, language) => {
    acc[language] = absoluteUrl(getLocalizedPath(routeKey, language, { storyId }));
    return acc;
  }, {
    'x-default': absoluteUrl(getLocalizedPath(routeKey, 'es', { storyId })),
  })
);

const localeForLanguage = (language: Language) => (language === 'en' ? 'en_US' : 'es_MX');

const alternateLocaleForLanguage = (language: Language) => (language === 'en' ? 'es_MX' : 'en_US');

const sharedMetadata = ({
  language,
  routeKey,
  title,
  description,
  path,
  image = defaultOgImage,
  storyId,
}: {
  language: Language;
  routeKey: RouteKey;
  title: string;
  description: string;
  path: string;
  image?: string;
  storyId?: string;
}): Metadata => {
  const url = absoluteUrl(path);

  return {
    metadataBase: getSiteUrlObject(),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(routeKey, storyId),
    },
    openGraph: {
      siteName,
      type: routeKey === 'story' ? 'article' : 'website',
      title,
      description,
      url,
      locale: localeForLanguage(language),
      alternateLocale: [alternateLocaleForLanguage(language)],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
};

export const buildPageMetadata = (routeKey: StaticRouteKey, language: Language): Metadata => {
  const seo = pageSeo[routeKey][language];

  return sharedMetadata({
    language,
    routeKey,
    title: seo.title,
    description: seo.description,
    path: getLocalizedPath(routeKey, language),
  });
};

export const buildStoryMetadata = (language: Language, slug: string): Metadata => {
  const storyId = getStoryIdFromSlug(slug) ?? slug;
  const story = storyResources[language].stories.items[storyId as keyof typeof storyResources[typeof language]['stories']['items']];
  const title = story?.title ? `${story.title} | Fundacion Costa Palmas` : pageSeo.stories[language].title;
  const description = story?.content ? truncate(stripHtml(story.content)) : pageSeo.stories[language].description;
  const path = getLocalizedPath('story', language, { storyId });
  const image = storyImages[storyId] ?? defaultOgImage;
  const metadata = sharedMetadata({
    language,
    routeKey: 'story',
    title,
    description,
    path,
    image,
    storyId,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: storyPublishedDates[storyId],
      authors: [siteName],
      tags: story?.category ? [story.category] : undefined,
    },
  };
};

export const getStoryStaticParams = (language: Language) => (
  Object.keys(storySlugs).map((storyId) => ({
    id: getStorySlug(storyId, language),
  }))
);

export const sitemapRoutes = () => {
  const staticRoutes = supportedLanguages.flatMap((language) => (
    Object.keys(localizedPaths[language]).map((routeKey) => ({
      routeKey: routeKey as StaticRouteKey,
      language,
      path: getLocalizedPath(routeKey as StaticRouteKey, language),
    }))
  ));
  const storyRoutes = supportedLanguages.flatMap((language) => (
    Object.keys(storySlugs).map((storyId) => ({
      routeKey: 'story' as const,
      language,
      storyId,
      path: getLocalizedPath('story', language, { storyId }),
    }))
  ));

  return [...staticRoutes, ...storyRoutes];
};
