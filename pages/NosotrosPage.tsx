import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Eye, Heart, Users, History, Handshake } from 'lucide-react';
import MissionVision from '../components/MissionVision';
import ImpactStatsAbout from '../components/ImpactStatsAbout';
import Partners from '../components/Partners';
import StrategicPartners from '../components/StrategicPartners';
import CTASection from '../components/CTASection';
import { useTranslation } from 'react-i18next';

const team = [
  {
    name: 'Pamela Sandoval',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-4_q5z4no.jpg',
    position: '0%',
    isSprite: false
  },
  {
    name: 'Carolina Cruz',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292707/HS-FCP-5_x3i1vv.jpg',
    position: '75%',
    isSprite: false
  },
  {
    name: 'Karla F. Espino',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-8_eqdh7g.jpg',
    position: '0%',
    isSprite: false
  },
  {
    name: 'Sinahy Cota',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-10_abttq9.jpg',
    position: '50%',
    isSprite: false
  },
];

const NosotrosPage: React.FC = () => {
  const { t } = useTranslation();
  const historyParagraphs = t('aboutPage.historyParagraphs', { returnObjects: true }) as string[];
  const teamCopy = t('aboutPage.team', { returnObjects: true }) as { role: string }[];
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="flex-grow pt-24">
      {/* Hero Section for About Us */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y }}
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1776803156/CP_2025_FCP__GOLF_CAMP-24_xzeuki.jpg" 
            alt={t('aboutPage.heroAlt')} 
            className="w-full h-[130%] object-cover absolute top-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            {t('aboutPage.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            {t('aboutPage.heroDescription')}
          </motion.p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center mb-6">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-4xl font-serif text-sea mb-8">{t('aboutPage.historyTitle')}</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                {historyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://res.cloudinary.com/dr78wne7t/image/upload/v1778195835/DSC_0767_1_oidq9v.jpg" 
                alt={t('aboutPage.historyTitle')} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-sea/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Misión, Visión y Valores */}
      <section className="py-24 bg-paper">
        <div className="container mx-auto px-4 md:px-8 mb-16 text-center">
          <h2 className="text-4xl font-serif text-sea mb-4">{t('aboutPage.missionTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('aboutPage.missionDescription')}
          </p>
        </div>
        <MissionVision />
      </section>

      {/* Impact Stats Section */}
      <ImpactStatsAbout />

      {/* Nuestro Equipo */}
      <section className="py-24 bg-paper overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <div className="w-12 h-12 bg-sea/10 text-sea rounded-xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-sea mb-4">{t('aboutPage.teamTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('aboutPage.teamDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative w-full aspect-[4/5] mb-8 overflow-hidden rounded-3xl bg-paper shadow-sm group-hover:shadow-2xl transition-all duration-500">
                  <div 
                    className={`${member.isSprite ? 'w-[500%] absolute top-0' : 'w-full h-full'} transition-transform duration-700 group-hover:scale-110`}
                    style={{ 
                      backgroundImage: `url(${member.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: member.isSprite ? `${member.position} center` : 'center',
                      left: member.isSprite ? `-${parseInt(member.position) * 4}%` : '0'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sea/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="text-center px-2">
                  <h3 className="text-xl font-bold text-sea mb-2 leading-tight">{member.name}</h3>
                  <div className="w-8 h-0.5 bg-terracotta mx-auto mb-3 transform origin-left transition-transform duration-300 group-hover:scale-x-150"></div>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase tracking-wider">{teamCopy[index].role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aliados Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-6 h-6" />
            </div>
            <h2 className="text-4xl font-serif text-sea mb-4">{t('aboutPage.alliesTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('aboutPage.alliesDescription')}
            </p>
          </div>
          <Partners />
        </div>
      </section>

      {/* Comunidad Costa Palmas Section */}
      <section className="py-24 bg-paper">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-sea mb-4">{t('aboutPage.communityTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('aboutPage.communityDescription')}
            </p>
          </div>
          <StrategicPartners type="community" />
        </div>
      </section>

      {/* Aliados Estratégicos Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-sea mb-4">{t('aboutPage.strategicTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('aboutPage.strategicDescription')}
            </p>
          </div>
          <StrategicPartners type="allies" />
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default NosotrosPage;
