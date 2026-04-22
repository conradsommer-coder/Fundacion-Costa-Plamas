import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Eye, Heart, Users, History, Handshake } from 'lucide-react';
import MissionVision from '../components/MissionVision';
import ImpactStatsAbout from '../components/ImpactStatsAbout';
import Partners from '../components/Partners';
import StrategicPartners from '../components/StrategicPartners';
import CTASection from '../components/CTASection';

const team = [
  {
    name: 'Pamela',
    role: 'Asistente Administrativo',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774075551/Equipo-Organigrama-scaled_dwo5rt.png',
    position: '100%',
    isSprite: true
  },
  {
    name: 'Carolina Cruz',
    role: 'Coordinadora de Operaciones',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292707/HS-FCP-5_x3i1vv.jpg',
    position: '75%',
    isSprite: false
  },
  {
    name: 'Karla Flores',
    role: 'Directora de Comunidad y Fundación',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-8_eqdh7g.jpg',
    position: '0%',
    isSprite: false
  },
  {
    name: 'Sinahy Cota',
    role: 'Coordinadora de Programas',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-10_abttq9.jpg',
    position: '50%',
    isSprite: false
  },
  {
    name: 'Brianda Estrada',
    role: 'Maestra de Inglés',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292701/HS-FCP-4_q5z4no.jpg',
    position: '25%',
    isSprite: false
  },
];

const NosotrosPage: React.FC = () => {
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
            alt="Nosotros Hero" 
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
            Nosotros
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Conoce la historia, el equipo y los valores que impulsan nuestra labor en Cabo del Este.
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
              <h2 className="text-4xl font-serif text-sea mb-8">Historia de la Fundación</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Fundación Costa Palmas nació de una visión compartida por preservar la belleza natural de Cabo del Este y, al mismo tiempo, fomentar el bienestar de sus habitantes.
                </p>
                <p>
                  Desde nuestros inicios, hemos trabajado incansablemente para cerrar las brechas de oportunidad en la región, enfocándonos en pilares fundamentales como la educación, la salud y la sostenibilidad ambiental.
                </p>
                <p>
                  Lo que comenzó como una pequeña iniciativa local ha crecido hasta convertirse en un motor de cambio significativo, impactando positivamente a miles de personas en comunidades como La Ribera, Santiago y Miraflores.
                </p>
              </div>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
              <img 
                src="https://res.cloudinary.com/dr78wne7t/image/upload/v1776830899/CP_2025_FCP__GOLF_CAMP-38ff_u6drui.jpg" 
                alt="Historia de la Fundación" 
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
          <h2 className="text-4xl font-serif text-sea mb-4">Misión, Visión y Valores</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nuestros principios rectores definen quiénes somos y hacia dónde vamos.
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
            <h2 className="text-4xl md:text-5xl font-serif text-sea mb-4">Nuestro Equipo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Un grupo apasionado de profesionales comprometidos con el desarrollo de nuestra región.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
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
                  <p className="text-gray-500 text-sm font-medium leading-relaxed uppercase tracking-wider">{member.role}</p>
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
            <h2 className="text-4xl font-serif text-sea mb-4">Personas que Apoyan / Aliados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gracias al apoyo de nuestros aliados, podemos multiplicar nuestro impacto en la comunidad.
            </p>
          </div>
          <Partners />
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section className="py-24 bg-paper">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-sea mb-4">Socios Estratégicos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Colaboramos con organizaciones clave para fortalecer nuestro compromiso con el desarrollo sostenible.
            </p>
          </div>
          <StrategicPartners />
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default NosotrosPage;
