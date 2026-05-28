import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import MissionVision from '../components/MissionVision';
import ProgramsGrid from '../components/ProgramsGrid';
import ImpactStats from '../components/ImpactStats';
import ImpactStories from '../components/ImpactStories';
import Region from '../components/Region';
import Partners from '../components/Partners';
import DonateSection from '../components/DonateSection';
import CTASection from '../components/CTASection';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main className="flex-grow overflow-x-hidden">
      <section id="inicio">
        <Hero />
      </section>

      <section id="nosotros" className="pt-40 pb-24 bg-white">
        <About />
      </section>

      <section className="py-24 bg-paper">
        <MissionVision />
      </section>

      <section id="programas" className="py-24 bg-white">
        <ProgramsGrid />
      </section>

      <section className="py-24 bg-sea text-white">
        <ImpactStats />
      </section>

      <ImpactStories />

      <section className="py-24 bg-white">
        <Region />
      </section>

      <section className="py-24 bg-paper">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-sea uppercase font-serif tracking-tight">{t('partners.title')}</h2>
          </div>
          <Partners />
        </div>
      </section>

      <section id="voluntariado" className="py-24 bg-white">
        <DonateSection />
      </section>

      <CTASection />
    </main>
  );
};

export default HomePage;
