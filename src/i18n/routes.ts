export type Language = 'es' | 'en';
export type RouteKey = 'home' | 'about' | 'programs' | 'stories' | 'story' | 'donate' | 'contact';

type StaticRouteKey = Exclude<RouteKey, 'story'>;

export interface RouteInfo {
  language: Language;
  routeKey: RouteKey;
  storyId?: string;
  canonicalPath: string;
  alternatePaths: Record<Language, string>;
}

export const defaultLanguage: Language = 'es';
export const supportedLanguages: Language[] = ['es', 'en'];

export const localizedPaths: Record<Language, Record<StaticRouteKey, string>> = {
  es: {
    home: '/es',
    about: '/es/nosotros',
    programs: '/es/programas',
    stories: '/es/historias',
    donate: '/es/donar',
    contact: '/es/contacto',
  },
  en: {
    home: '/en',
    about: '/en/about',
    programs: '/en/programs',
    stories: '/en/stories',
    donate: '/en/donate',
    contact: '/en/contact',
  },
};

export const legacySpanishPaths: Record<StaticRouteKey, string> = {
  home: '/',
  about: '/nosotros',
  programs: '/programas',
  stories: '/historias',
  donate: '/donar',
  contact: '/contacto',
};

export const storySlugs: Record<string, Record<Language, string>> = {
  'proteccion-palmar': {
    es: 'proteccion-palmar',
    en: 'protecting-palmar',
  },
  'diagnostico-corazon': {
    es: 'diagnostico-corazon',
    en: 'timely-heart-diagnosis',
  },
  'becas-uabcs': {
    es: 'becas-uabcs',
    en: 'uabcs-scholarships',
  },
  'campana-vacunacion': {
    es: 'campana-vacunacion',
    en: 'vaccination-campaign',
  },
  'rehabilitacion-esperanza': {
    es: 'rehabilitacion-esperanza',
    en: 'rehabilitation-brings-hope-closer',
  },
  'deporte-comunidad': {
    es: 'deporte-comunidad',
    en: 'sports-bring-community-back',
  },
  'playa-se-conserva': {
    es: 'playa-se-conserva',
    en: 'preserving-the-beach-every-day',
  },
};

const slugToStoryId = Object.entries(storySlugs).reduce<Record<string, string>>((acc, [storyId, slugs]) => {
  acc[storyId] = storyId;
  supportedLanguages.forEach((language) => {
    acc[slugs[language]] = storyId;
  });
  return acc;
}, {});

const trimTrailingSlash = (path: string) => {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
};

export const getLanguageFromValue = (language: string | null | undefined): Language => (
  language?.split('-')[0] === 'en' ? 'en' : defaultLanguage
);

export const getStoryIdFromSlug = (slug: string | undefined) => {
  if (!slug) return undefined;
  return slugToStoryId[slug];
};

export const getStorySlug = (storyId: string, language: Language) => (
  storySlugs[storyId]?.[language] ?? storyId
);

export const getLocalizedPath = (routeKey: RouteKey, language: Language, options: { storyId?: string; hash?: string } = {}) => {
  const hash = options.hash ? (options.hash.startsWith('#') ? options.hash : `#${options.hash}`) : '';

  if (routeKey === 'story') {
    const storyId = options.storyId ?? 'proteccion-palmar';
    return `${localizedPaths[language].stories}/${getStorySlug(storyId, language)}${hash}`;
  }

  return `${localizedPaths[language][routeKey]}${hash}`;
};

export const getPathLanguage = (pathname: string): Language | null => {
  const [, prefix] = trimTrailingSlash(pathname).split('/');
  return prefix === 'es' || prefix === 'en' ? prefix : null;
};

const getPathWithoutLanguage = (pathname: string) => {
  const normalized = trimTrailingSlash(pathname);
  const language = getPathLanguage(normalized);

  if (!language) {
    return { language: null, path: normalized };
  }

  const withoutPrefix = normalized.replace(/^\/(es|en)(?=\/|$)/, '') || '/';
  return { language, path: trimTrailingSlash(withoutPrefix) };
};

const buildRouteInfo = (routeKey: RouteKey, language: Language, storyId?: string): RouteInfo => {
  const alternatePaths = supportedLanguages.reduce<Record<Language, string>>((acc, alternateLanguage) => {
    acc[alternateLanguage] = getLocalizedPath(routeKey, alternateLanguage, { storyId });
    return acc;
  }, {} as Record<Language, string>);

  return {
    language,
    routeKey,
    storyId,
    canonicalPath: getLocalizedPath(routeKey, language, { storyId }),
    alternatePaths,
  };
};

export const getRouteInfo = (pathname: string): RouteInfo | null => {
  const { language: prefixedLanguage, path } = getPathWithoutLanguage(pathname);
  const language = prefixedLanguage ?? defaultLanguage;

  for (const [routeKey, routePath] of Object.entries(localizedPaths[language]) as [StaticRouteKey, string][]) {
    const comparablePath = prefixedLanguage ? getPathWithoutLanguage(routePath).path : legacySpanishPaths[routeKey];
    if (path === comparablePath) {
      return buildRouteInfo(routeKey, language);
    }
  }

  if (!prefixedLanguage) {
    for (const [routeKey, routePath] of Object.entries(legacySpanishPaths) as [StaticRouteKey, string][]) {
      if (path === routePath) {
        return buildRouteInfo(routeKey, defaultLanguage);
      }
    }
  }

  const storyBasePath = prefixedLanguage ? getPathWithoutLanguage(localizedPaths[language].stories).path : legacySpanishPaths.stories;
  const storyMatch = path.match(new RegExp(`^${storyBasePath}/([^/]+)$`));
  const storyId = getStoryIdFromSlug(storyMatch?.[1]);

  if (storyId) {
    return buildRouteInfo('story', language, storyId);
  }

  return null;
};

export const getEquivalentLocalizedPath = (
  pathname: string,
  targetLanguage: Language,
  search = '',
  hash = '',
) => {
  const routeInfo = getRouteInfo(pathname);
  if (!routeInfo) {
    const normalizedPath = trimTrailingSlash(pathname);
    return `${targetLanguage === 'en' ? '/en' : '/es'}${normalizedPath === '/' ? '' : normalizedPath}${search}${hash}`;
  }

  return `${getLocalizedPath(routeInfo.routeKey, targetLanguage, { storyId: routeInfo.storyId })}${search}${hash}`;
};
