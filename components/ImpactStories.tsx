import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';
import { cloudinaryImageSrcSet, cloudinaryImageUrl } from '../src/utils/cloudinary';

const stories = [
  {
    id: 'proteccion-palmar',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
  },
  {
    id: 'diagnostico-corazon',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Corazon-de-nin%CC%83o-Enero-14_hiedwq.jpg',
  },
  {
    id: 'becas-uabcs',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195691/DSC02253_e2kb92.jpg',
  },
  {
    id: 'campana-vacunacion',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
  },
];

interface ImpactStoriesProps {
  showTitle?: boolean;
}

const ImpactStories: React.FC<ImpactStoriesProps> = ({ showTitle = true }) => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-[#F5F2E8] py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          {showTitle && <h2 className="text-4xl md:text-5xl text-sea mb-8 font-serif">{t('stories.sectionTitle')}</h2>}
          <p className="text-xl md:text-2xl text-sea/80 leading-relaxed font-light italic">
            {t('stories.quote')}
          </p>
          <div className="w-20 h-1 bg-coral mx-auto mt-8" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-12"
        >
          {stories.map((story, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 shadow-xl relative z-10">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src={cloudinaryImageUrl(story.image, 700)}
                  srcSet={cloudinaryImageSrcSet(story.image, [420, 560, 700, 900])}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  alt={t(`stories.items.${story.id}.title`)} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-sea shadow-sm">
                  {t(`stories.items.${story.id}.category`)}
                </div>
              </div>
              <div className="flex-grow px-2">
                <h3 className="text-2xl md:text-3xl text-sea mb-4 font-serif leading-tight group-hover:text-coral transition-colors duration-300">
                  {t(`stories.items.${story.id}.title`)}
                </h3>
                <p className="text-gray-400 text-sm mb-8 font-medium">{t(`stories.items.${story.id}.date`)}</p>
                <Link 
                  to={getLocalizedPath('story', language, { storyId: story.id })}
                  className="inline-flex items-center px-8 py-3 bg-sea text-white rounded-full text-xs font-bold tracking-widest hover:bg-coral transition-all uppercase shadow-lg hover:shadow-coral/20"
                >
                  {t('stories.readMore')}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactStories;
