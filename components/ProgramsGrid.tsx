
import React from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';
import { cloudinaryImageSrcSet, cloudinaryImageUrl } from '../src/utils/cloudinary';

const programs = [
  {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774036983/DSC00965_nzdx6q.jpg',
    href: '/programas#educacion'
  },
  {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776801241/Tortugas2_hcp6tv.jpg',
    href: '/programas#medio-ambiente'
  },
  {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774042414/Corazon-de-nin%CC%83o-Enero-35_zkpeel.jpg',
    href: '/programas#salud-integral'
  },
  {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292725/Voluntariado_Popescu_pintando_kinder-012_syan92.jpg',
    href: '/programas#espacios'
  },
];

const ProgramsGrid: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const programCopy = t('programsGrid.items', { returnObjects: true }) as {
    title: string;
    alt: string;
  }[];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {programs.map((program, index) => (
          <Link 
            key={index} 
            to={getLocalizedPath('programs', language, { hash: program.href.split('#')[1] })}
            className="group relative rounded-[2.5rem] overflow-hidden shadow-lg cursor-pointer block transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 aspect-[16/10] md:aspect-[16/9]"
          >
            <img 
              src={cloudinaryImageUrl(program.image, 900)}
              srcSet={cloudinaryImageSrcSet(program.image, [480, 720, 900, 1200])}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt={programCopy[index].alt} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-serif leading-tight transition-colors duration-300 group-hover:text-coral">
                {programCopy[index].title}
              </h3>
              <div className="w-0 h-0.5 bg-coral mt-4 transition-all duration-500 group-hover:w-12"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramsGrid;
