import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import ImpactStories from '../components/ImpactStories';
import CTASection from '../components/CTASection';

const HistoriasPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="flex-grow pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y }}
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774391185/mohd-lazim-ath-thany-bin-mohd-lazim-ddg3sq9lnk0-unsplash_aj2j6j.jpg" 
            alt="Historias Hero" 
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
            Historias de Impacto
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Descubre las historias reales de transformación y esperanza que nacen en el corazón de Cabo del Este.
          </motion.p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/10]"
            >
              <img 
                src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg" 
                alt="Featured Story" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-coral font-bold tracking-widest uppercase text-sm mb-4 block">Historia Destacada</span>
              <h2 className="text-4xl md:text-5xl text-sea mb-6 font-serif">Un compromiso con la protección del Palmar</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                La protección de nuestros ecosistemas es una de las prioridades fundamentales de Fundación Costa Palmas. El Palmar de Cabo del Este no es solo un paisaje hermoso, es un pulmón vital para nuestra región y un hogar para innumerables especies.
              </p>
              <Link 
                to="/historias/proteccion-palmar"
                className="inline-block px-10 py-4 bg-sea text-white rounded-full font-bold hover:bg-sea/90 transition-all shadow-lg hover:shadow-xl"
              >
                Leer historia completa
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <ImpactStories showTitle={false} />

      {/* Optional: More blog-like content or filters could go here */}
      
      <CTASection />
    </main>
  );
};

export default HistoriasPage;
