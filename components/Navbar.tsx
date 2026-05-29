
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { getEquivalentLocalizedPath, getLanguageFromValue, getLocalizedPath, getRouteInfo } from '../src/i18n/routes';
import type { RouteKey } from '../src/i18n/routes';
import { cloudinaryImageUrl } from '../src/utils/cloudinary';

const colorLogo = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png';
const whiteLogo = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774037190/ChatGPT_Image_Mar_10_2026_07_50_31_PM_d3ympz.png';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLanguage = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const nextLanguage = currentLanguage === 'es' ? 'en' : 'es';
  const activeRoute = getRouteInfo(location.pathname)?.routeKey;

  const navLinks: { label: string; href: string; routeKey: RouteKey }[] = [
    { label: t('navigation.home'), href: getLocalizedPath('home', currentLanguage), routeKey: 'home' },
    { label: t('navigation.about'), href: getLocalizedPath('about', currentLanguage), routeKey: 'about' },
    { label: t('navigation.programs'), href: getLocalizedPath('programs', currentLanguage), routeKey: 'programs' },
    { label: t('navigation.stories'), href: getLocalizedPath('stories', currentLanguage), routeKey: 'stories' },
    { label: t('navigation.contact'), href: getLocalizedPath('contact', currentLanguage), routeKey: 'contact' },
  ];

  const isHome = activeRoute === 'home';
  const handleLanguageChange = () => {
    void i18n.changeLanguage(nextLanguage);
    navigate(getEquivalentLocalizedPath(location.pathname, nextLanguage, location.search, location.hash));
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to={getLocalizedPath('home', currentLanguage)} className="flex items-center gap-2">
          <img 
            src={scrolled || !isHome 
              ? cloudinaryImageUrl(colorLogo, 240)
              : cloudinaryImageUrl(whiteLogo, 240)
            } 
            alt={t('common.logoAlt')} 
            className="h-12 md:h-20 w-auto object-contain transition-all duration-300"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeRoute === link.routeKey;
            const isExternal = link.href.startsWith('http');
            
            return (
              <div key={link.href} className="relative group">
                {isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-bold transition-colors py-2 ${
                      scrolled || !isHome 
                        ? 'text-sea/70 hover:text-sea' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-bold transition-colors py-2 flex flex-col items-center ${
                      isActive
                        ? (scrolled || !isHome ? 'text-sea' : 'text-white')
                        : (scrolled || !isHome ? 'text-sea/60 hover:text-sea' : 'text-white/60 hover:text-white')
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${
                          scrolled || !isHome ? 'bg-coral' : 'bg-white'
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${
                        scrolled || !isHome ? 'bg-coral/40' : 'bg-white/40'
                      }`} />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
          
          <div className="flex items-center gap-6 pl-4 border-l border-gray-300/30">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={getLocalizedPath('donate', currentLanguage)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                  scrolled || !isHome
                    ? 'bg-coral text-white hover:brightness-110' 
                    : 'bg-white text-sea hover:bg-coral hover:text-white'
                }`}
              >
                {t('navigation.donate')}
              </Link>
            </motion.div>
            
            <button
              type="button"
              onClick={handleLanguageChange}
              aria-label={t('language.switchTo')}
              className={`flex items-center gap-1 text-xs font-bold transition-opacity hover:opacity-70 ${scrolled || !isHome ? 'text-gray-500' : 'text-white/80'}`}
            >
              <Globe className="w-4 h-4" />
              <span>{t('language.current')} | {t('language.alternate')}</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={`w-8 h-8 ${scrolled || !isHome ? 'text-sea' : 'text-white'}`} />
          ) : (
            <Menu className={`w-8 h-8 ${scrolled || !isHome ? 'text-sea' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-8 shadow-2xl"
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.routeKey;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-2xl font-serif transition-colors ${
                    isActive ? 'text-coral' : 'text-sea hover:text-coral'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                  {isActive && <span className="ml-2 text-coral">•</span>}
                </Link>
              );
            })}
            <Link
              to={getLocalizedPath('donate', currentLanguage)}
              className="bg-coral text-white text-center py-4 rounded-full font-bold text-lg shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              {t('navigation.donate')}
            </Link>
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleLanguageChange}
                aria-label={t('language.switchTo')}
                className="flex items-center gap-2 text-gray-500 font-bold"
              >
                <Globe className="w-5 h-5" />
                <span>{t('language.current')} | {t('language.alternate')}</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
