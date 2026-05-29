import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';
import { cloudinaryImageUrl } from '../src/utils/cloudinary';

const partners = [
  { name: 'CROC', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292707/logo_croc_vrah64.png' },
  { name: 'UABCS', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776815050/logo-universidad-autonoma-de-baja-california-sur_gnvjqv.webp' },
  { name: 'Teletón', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/color_v_kawyay.png' },
  { name: 'Corazón de Niño', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292710/Logo-ACDN-pantalla_s0i8bf.png' },
  { name: 'Amigos de los Niños', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/607962733_122095581807203157_1272613460739661110_n_yoh1cu.jpg' },
  { name: 'Red Autismo', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292719/RA-Logotipo_byb59e.png' },
  { name: 'SOFEMAT', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/ZOFEMAT_wlr8ua.jpg' },
  { name: 'Amigos de los Animales', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292711/logo_ra4o3f.png' },
  { name: 'ATM Banco de Sangre', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195689/ATM_Banco_de_Sangre_xby4pd.jpg' },
];

const Partners: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {partners.map((partner, index) => (
          <div 
            key={index} 
            className="h-32 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center p-8 transition-transform duration-300 hover:scale-105"
          >
            <img 
              src={cloudinaryImageUrl(partner.logo, 320)}
              alt={partner.name} 
              className="max-h-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          to={getLocalizedPath('contact', language)}
          className="inline-block px-10 py-4 border-2 border-sea text-sea rounded-full font-bold hover:bg-sea hover:text-white transition-all"
        >
          {t('partners.cta')}
        </Link>
      </div>
    </>
  );
};

export default Partners;
