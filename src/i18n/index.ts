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

export const getInitialLanguage = (): SupportedLanguage => {
  const savedLanguage = localStorage.getItem(languageStorageKey);
  if (isSupportedLanguage(savedLanguage)) {
    return savedLanguage;
  }

  return defaultLanguage;
};

const updateDocumentLanguage = (language: string) => {
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
  localStorage.setItem(languageStorageKey, resolvedLanguage);
  updateDocumentLanguage(resolvedLanguage);
});

export default i18n;
