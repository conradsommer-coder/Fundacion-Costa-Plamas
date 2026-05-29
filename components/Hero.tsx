
import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cloudinaryImageSrcSet, cloudinaryImageUrl } from '../src/utils/cloudinary';

const heroImage = 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292722/SANTIAGO_CLEANUP-39_nf45u6.jpg';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-start overflow-hidden py-32 md:py-40">
      {/* Background with high-quality landscape and Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={cloudinaryImageUrl(heroImage, 1920)}
          srcSet={cloudinaryImageSrcSet(heroImage, [960, 1280, 1600, 1920])}
          sizes="100vw"
          alt={t('hero.imageAlt')} 
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 md:px-8 relative z-10"
      >
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight font-serif"
          >
            {t('hero.titleLine1')} <br />
            {t('hero.titleLine2Prefix')} <span className="italic">{t('hero.titleLine2Emphasis')}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 pt-4"
          >
            <a 
              href="#programas" 
              className="px-10 py-5 bg-white text-sea rounded-full font-bold text-center transition-all hover:bg-paper hover:scale-105 shadow-xl"
            >
              {t('hero.programsCta')}
            </a>
            <a 
              href="https://azclftch.donorsupport.co/-/XATEBFMG" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-coral text-white rounded-full font-bold text-center transition-all hover:bg-opacity-90 hover:scale-105 shadow-xl"
            >
              {t('hero.donateCta')}
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="w-8 h-8 text-white/70" />
      </motion.div>
    </div>
  );
};

export default Hero;
