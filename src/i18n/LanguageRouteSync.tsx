'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getPathLanguage, getRouteInfo } from './routes';

const LanguageRouteSync = () => {
  const pathname = usePathname() || '/';
  const { i18n } = useTranslation();

  useEffect(() => {
    const routeLanguage = getRouteInfo(pathname)?.language ?? getPathLanguage(pathname);

    if (routeLanguage && getLanguageFromValue(i18n.resolvedLanguage || i18n.language) !== routeLanguage) {
      void i18n.changeLanguage(routeLanguage);
    }
  }, [i18n, i18n.language, i18n.resolvedLanguage, pathname]);

  return null;
};

export default LanguageRouteSync;
