import React, { useState, useEffect } from 'react';
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

const HomePage: React.FC = () => {
  return (
    <main className="flex-grow">
      <section id="inicio">
        <Hero />
      </section>

      <section id="nosotros" className="py-24 bg-white">
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
            <h2 className="text-4xl md:text-5xl text-sea mb-4">Nuestros Aliados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trabajamos de la mano con organizaciones y empresas que comparten nuestro compromiso con Cabo del Este.
            </p>
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
