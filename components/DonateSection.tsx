
import React from 'react';
import { DollarSign, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';
import type { RouteKey } from '../src/i18n/routes';

const waysToHelp = [
  {
    icon: DollarSign,
    color: 'bg-coral/10 text-coral',
    routeKey: 'donate' as RouteKey,
  },
  {
    icon: Package,
    color: 'bg-coral/10 text-coral',
    routeKey: 'contact' as RouteKey,
  },
  {
    icon: Users,
    color: 'bg-coral/10 text-coral',
    routeKey: 'contact' as RouteKey,
    hash: 'voluntario',
  },
];

const DonateSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const translatedWays = t('donateSection.ways', { returnObjects: true }) as {
    title: string;
    description: string;
    buttonText: string;
  }[];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-sea mb-6">{t('donateSection.title')}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {t('donateSection.description')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {waysToHelp.map((way, index) => (
          <div key={index} className="bg-paper p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className={`w-16 h-16 ${way.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <way.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl text-sea mb-4">{translatedWays[index].title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8 italic">
              {translatedWays[index].description}
            </p>
            <Link 
              to={getLocalizedPath(way.routeKey, language, { hash: way.hash })}
              className="mt-auto px-8 py-3 bg-sea text-white rounded-full font-bold hover:bg-sea/90 transition-all shadow-md hover:shadow-lg text-sm"
            >
              {translatedWays[index].buttonText}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonateSection;
