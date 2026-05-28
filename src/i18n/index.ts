import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './resources/en';
import es from './resources/es';

export const supportedLanguages = ['es', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const defaultLanguage: SupportedLanguage = 'es';
const languageStorageKey = 'fundacion-costa-palmas-language';

const isSupportedLanguage = (language: string | null | undefined): language is SupportedLanguage => {
  return supportedLanguages.includes(language as SupportedLanguage);
};

const getLanguageFromPathname = (pathname: string): SupportedLanguage => {
  const [, prefix] = pathname.split('/');
  return isSupportedLanguage(prefix) ? prefix : defaultLanguage;
};

export const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  return getLanguageFromPathname(window.location.pathname);
};

const updateDocumentLanguage = (language: string) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = isSupportedLanguage(language) ? language : defaultLanguage;
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: getInitialLanguage(),
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

updateDocumentLanguage(i18n.language);

i18n.on('languageChanged', (language) => {
  const resolvedLanguage = isSupportedLanguage(language) ? language : defaultLanguage;
  if (typeof window !== 'undefined') {
    localStorage.setItem(languageStorageKey, resolvedLanguage);
  }
  updateDocumentLanguage(resolvedLanguage);
});

export default i18n;
