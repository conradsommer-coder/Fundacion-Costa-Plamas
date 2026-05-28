import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getLanguageFromValue, getLocalizedPath, getRouteInfo } from '../i18n/routes';
import type { Language } from '../i18n/routes';
import { getRouteMetadata, routeMetadataManifest } from './routeMetadata';
import type { SeoRouteMetadata } from './routeMetadata';

const defaultSiteUrl = 'https://fundacioncostapalmas.org';
const defaultImage = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292722/SANTIAGO_CLEANUP-39_nf45u6.jpg';
const defaultImageAlt = 'Fundación Costa Palmas community program in Cabo del Este';

const ogLocales: Record<Language, string> = {
  es: 'es_MX',
  en: 'en_US',
};

const getSiteUrl = () => {
  const configuredUrl = (import.meta as any).env?.VITE_SITE_URL as string | undefined;
  return (configuredUrl?.trim() || defaultSiteUrl).replace(/\/+$/, '');
};

const getAbsoluteUrl = (siteUrl: string, path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;

const getFallbackMetadata = (language: Language): SeoRouteMetadata => (
  getRouteMetadata(getLocalizedPath('home', language))
  ?? getRouteMetadata('/')
  ?? routeMetadataManifest[0]
);

const upsertMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const removeMeta = (attribute: 'name' | 'property', key: string) => {
  document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)?.remove();
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
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const routeInfo = getRouteInfo(location.pathname);
    const language = routeInfo?.language ?? getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
    const metadata = getRouteMetadata(location.pathname)
      ?? (routeInfo ? getRouteMetadata(routeInfo.canonicalPath) : undefined)
      ?? getFallbackMetadata(language);

    const siteUrl = getSiteUrl();
    const canonicalUrl = getAbsoluteUrl(siteUrl, metadata.canonicalPath);
    const ogType = metadata.isStoryDetailPage ? 'article' : 'website';
    const alternateLanguage = metadata.language === 'es' ? 'en' : 'es';

    document.title = metadata.title;
    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', defaultImage);
    upsertMeta('name', 'twitter:image:alt', defaultImageAlt);
    upsertMeta('property', 'og:site_name', 'Fundación Costa Palmas');
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', defaultImage);
    upsertMeta('property', 'og:image:alt', defaultImageAlt);
    upsertMeta('property', 'og:locale', ogLocales[metadata.language]);
    upsertMeta('property', 'og:locale:alternate', ogLocales[alternateLanguage]);

    if (metadata.isStoryDetailPage) {
      upsertMeta('property', 'article:author', 'Fundación Costa Palmas');
      upsertMeta('property', 'article:section', metadata.language === 'es' ? 'Historias de Impacto' : 'Impact Stories');
    } else {
      removeMeta('property', 'article:author');
      removeMeta('property', 'article:section');
    }

    upsertCanonical(canonicalUrl);
    upsertAlternate('es', getAbsoluteUrl(siteUrl, metadata.alternatePaths.es));
    upsertAlternate('en', getAbsoluteUrl(siteUrl, metadata.alternatePaths.en));
    upsertAlternate('x-default', getAbsoluteUrl(siteUrl, metadata.alternatePaths.es));
  }, [i18n, i18n.language, i18n.resolvedLanguage, location.pathname]);

  return null;
};

export default Seo;
