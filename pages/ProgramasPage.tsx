
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Partners from '../components/Partners';
import CTASection from '../components/CTASection';
import { useTranslation } from 'react-i18next';

const programs = [
  {
    id: 'educacion',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774036983/DSC00965_nzdx6q.jpg',
    color: 'bg-sea/5'
  },
  {
    id: 'medio-ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776801241/Tortugas2_hcp6tv.jpg',
    color: 'bg-white'
  },
  {
    id: 'salud-integral',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774042414/Corazon-de-nin%CC%83o-Enero-35_zkpeel.jpg',
    color: 'bg-white'
  },
  {
    id: 'espacios',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292725/Voluntariado_Popescu_pintando_kinder-012_syan92.jpg',
    color: 'bg-sea/5'
  }
];

const ProgramasPage: React.FC = () => {
  const { t } = useTranslation();
  const programCopy = t('programsPage.items', { returnObjects: true }) as {
    title: string;
    subtitle: string;
    description: string;
  }[];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="flex-grow pt-24 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y }}
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1776292756/WhatsApp_Image_2025-12-10_at_4.59.28_PM_4_fl6uct.jpg" 
            alt={t('programsPage.heroAlt')} 
            className="w-full h-[130%] object-cover absolute top-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            {t('programsPage.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            {t('programsPage.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl text-sea mb-8 font-serif leading-tight">
              {t('programsPage.introTitle')}
            </h2>
            <div className="w-24 h-1.5 bg-coral mx-auto mb-10 rounded-full" />
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {t('programsPage.introDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="pb-20">
        {programs.map((program, index) => (
          <div 
            key={program.id} 
            className={`py-20 ${program.color}`}
          >
            <div className="container mx-auto px-4 md:px-8">
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10"
                    >
                      <img 
                        src={program.image} 
                        alt={programCopy[index].title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    {/* Decorative element */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className={`absolute -z-0 w-full h-full border-2 border-coral rounded-3xl ${index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'}`} 
                    />
                  </motion.div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-4xl md:text-5xl text-sea mb-6 font-serif">{programCopy[index].title}</h3>
                    <p className="text-xl text-sea/80 font-medium mb-6 italic leading-snug">
                      "{programCopy[index].subtitle}"
                    </p>
                    <div className="h-1 w-20 bg-coral mb-8" />
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {programCopy[index].description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-paper overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-sea font-serif mb-6">{t('partners.title')}</h2>
            <div className="w-16 h-1 bg-coral mx-auto mb-8" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
              {t('programsPage.partnersDescription')}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Partners />
          </motion.div>
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default ProgramasPage;
