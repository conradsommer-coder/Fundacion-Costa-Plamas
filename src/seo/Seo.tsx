'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath, getRouteInfo } from '../i18n/routes';
import type { Language, RouteKey } from '../i18n/routes';

type LocalizedSeo = Record<Language, {
  title: string;
  description: string;
}>;

const defaultImage = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292722/SANTIAGO_CLEANUP-39_nf45u6.jpg';

const pageSeo: Record<Exclude<RouteKey, 'story'>, LocalizedSeo> = {
  home: {
    es: {
      title: 'Fundación Costa Palmas | Comunidad y Conservación',
      description: 'Fundación Costa Palmas impulsa educación, salud, conservación ambiental y bienestar comunitario en Cabo del Este, Baja California Sur.',
    },
    en: {
      title: 'Fundación Costa Palmas | Community and Conservation',
      description: 'Fundación Costa Palmas advances education, health, environmental conservation, and community well-being in Cabo del Este, Baja California Sur.',
    },
  },
  about: {
    es: {
      title: 'Nosotros | Fundación Costa Palmas',
      description: 'Conoce la historia, el equipo, los valores y los aliados que impulsan el trabajo de Fundación Costa Palmas en Cabo del Este.',
    },
    en: {
      title: 'About Us | Fundación Costa Palmas',
      description: 'Learn about the story, team, values, and partners behind Fundación Costa Palmas work in Cabo del Este.',
    },
  },
  programs: {
    es: {
      title: 'Programas | Fundación Costa Palmas',
      description: 'Programas de educación, medio ambiente, salud integral y espacios comunitarios que fortalecen a Cabo del Este.',
    },
    en: {
      title: 'Programs | Fundación Costa Palmas',
      description: 'Education, environment, comprehensive health, and community space programs strengthening Cabo del Este.',
    },
  },
  stories: {
    es: {
      title: 'Historias de Impacto | Fundación Costa Palmas',
      description: 'Historias reales de impacto comunitario, educación, salud y conservación ambiental en Cabo del Este.',
    },
    en: {
      title: 'Impact Stories | Fundación Costa Palmas',
      description: 'Real stories of community impact, education, health, and environmental conservation in Cabo del Este.',
    },
  },
  donate: {
    es: {
      title: 'Donar | Fundación Costa Palmas',
      description: 'Apoya los programas de Fundación Costa Palmas y contribuye al bienestar de las comunidades de Cabo del Este.',
    },
    en: {
      title: 'Donate | Fundación Costa Palmas',
      description: 'Support Fundación Costa Palmas programs and contribute to the well-being of Cabo del Este communities.',
    },
  },
  contact: {
    es: {
      title: 'Contacto | Fundación Costa Palmas',
      description: 'Contacta a Fundación Costa Palmas para colaborar, donar, ser voluntario o conocer más sobre sus programas.',
    },
    en: {
      title: 'Contact | Fundación Costa Palmas',
      description: 'Contact Fundación Costa Palmas to collaborate, donate, volunteer, or learn more about its programs.',
    },
  },
};

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const truncate = (value: string, maxLength = 155) => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 1).trim()}...`;
};

const getSiteUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return (configuredUrl || window.location.origin).replace(/\/$/, '');
};

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const upsertAlternate = (hreflang: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'alternate');
    element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const Seo = () => {
  const pathname = usePathname() || '/';
  const { i18n } = useTranslation();

  useEffect(() => {
    const routeInfo = getRouteInfo(pathname);
    const language = routeInfo?.language ?? getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
    const fixedT = i18n.getFixedT(language);
    let seo = routeInfo?.routeKey === 'story'
      ? pageSeo.stories[language]
      : pageSeo[routeInfo?.routeKey ?? 'home'][language];

    if (routeInfo?.routeKey === 'story' && routeInfo.storyId) {
      const title = fixedT(`stories.items.${routeInfo.storyId}.title`, { defaultValue: '' });
      const content = fixedT(`stories.items.${routeInfo.storyId}.content`, { defaultValue: '' });

      if (title && content) {
        seo = {
          title: `${title} | Fundación Costa Palmas`,
          description: truncate(stripHtml(content)),
        };
      }
    }

    const siteUrl = getSiteUrl();
    const canonicalPath = routeInfo?.canonicalPath ?? getLocalizedPath('home', language);
    const alternatePaths = routeInfo?.alternatePaths ?? {
      es: getLocalizedPath('home', 'es'),
      en: getLocalizedPath('home', 'en'),
    };
    const canonicalUrl = `${siteUrl}${canonicalPath}`;

    document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', seo.title);
    upsertMeta('name', 'twitter:description', seo.description);
    upsertMeta('name', 'twitter:image', defaultImage);
    upsertMeta('property', 'og:site_name', 'Fundación Costa Palmas');
    upsertMeta('property', 'og:type', routeInfo?.routeKey === 'story' ? 'article' : 'website');
    upsertMeta('property', 'og:title', seo.title);
    upsertMeta('property', 'og:description', seo.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', defaultImage);
    upsertCanonical(canonicalUrl);
    upsertAlternate('es', `${siteUrl}${alternatePaths.es}`);
    upsertAlternate('en', `${siteUrl}${alternatePaths.en}`);
    upsertAlternate('x-default', `${siteUrl}${alternatePaths.es}`);
  }, [i18n, i18n.language, i18n.resolvedLanguage, pathname]);

  return null;
};

export default Seo;
