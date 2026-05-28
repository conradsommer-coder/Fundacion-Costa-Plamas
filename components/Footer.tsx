
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);

  return (
    <footer className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <img 
              src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png" 
              alt={t('common.logoAlt')} 
              className="h-16 w-auto object-contain mb-8"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-500 leading-relaxed mb-8">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: 'https://www.facebook.com/fundacioncostapalmas', label: t('footer.facebookAlt') },
                { Icon: Instagram, href: 'https://www.instagram.com/fundacioncostapalmas/', label: t('footer.instagramAlt') }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-sea hover:bg-sea hover:text-white transition-all"
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sea font-bold text-lg mb-8">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link to={getLocalizedPath('home', language)} className="hover:text-sea transition-colors">{t('navigation.home')}</Link></li>
              <li><Link to={getLocalizedPath('about', language)} className="hover:text-sea transition-colors">{t('navigation.about')}</Link></li>
              <li><Link to={getLocalizedPath('programs', language)} className="hover:text-sea transition-colors">{t('navigation.programs')}</Link></li>
              <li><Link to={getLocalizedPath('contact', language)} className="hover:text-sea transition-colors">{t('navigation.contact')}</Link></li>
              <li><Link to={getLocalizedPath('contact', language)} className="hover:text-sea transition-colors">{t('navigation.volunteer')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sea font-bold text-lg mb-8">{t('footer.contact')}</h4>
            <ul className="space-y-6 text-gray-600">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-coral shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-coral shrink-0" />
                <a href="mailto:fundacion@costapalmas.com" className="hover:text-sea transition-colors">
                  fundacion@costapalmas.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
            <span className="hidden md:inline text-gray-200">|</span>
            <span>{t('footer.createdBy')} <a href="https://motionagency.mx" target="_blank" rel="noopener noreferrer" className="hover:text-sea transition-colors font-medium">Motion Agency</a></span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-sea transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-sea transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
