import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getLanguageFromValue, getPathLanguage, getRouteInfo } from './routes';

const LanguageRouteSync = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const routeLanguage = getRouteInfo(location.pathname)?.language ?? getPathLanguage(location.pathname);

    if (routeLanguage && getLanguageFromValue(i18n.resolvedLanguage || i18n.language) !== routeLanguage) {
      void i18n.changeLanguage(routeLanguage);
    }
  }, [i18n, i18n.language, i18n.resolvedLanguage, location.pathname]);

  return null;
};

export default LanguageRouteSync;

