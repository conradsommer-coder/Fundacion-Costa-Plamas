
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Partners from '../components/Partners';
import CTASection from '../components/CTASection';

const programs = [
  {
    id: 'educacion',
    title: 'Educación',
    subtitle: 'Empoderando a nuestra comunidad a través de talleres y capacitación.',
    description: 'Creemos que la educación es el motor del cambio. Nuestro programa se enfoca en brindar herramientas prácticas y conocimientos técnicos a jóvenes y adultos de Cabo del Este. Desde talleres de oficios hasta capacitaciones en habilidades digitales, buscamos que cada individuo tenga la oportunidad de alcanzar su máximo potencial y contribuir al desarrollo económico de su familia y comunidad.',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774036983/DSC00965_nzdx6q.jpg',
    color: 'bg-sea/5'
  },
  {
    id: 'medio-ambiente',
    title: 'Medio Ambiente',
    subtitle: 'Impulsando el cuidado del medio ambiente e inspirando a los niños a proteger nuestros recursos naturales.',
    description: 'Cabo del Este posee una riqueza natural única que debemos preservar. Trabajamos de la mano con escuelas y familias para fomentar una cultura de respeto por la naturaleza. A través de jornadas de limpieza de playas, programas de reforestación y educación sobre la fauna local (como la protección de tortugas marinas), inspiramos a las nuevas generaciones a convertirse en guardianes de su entorno.',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774043917/DJI_0447_eztgmz.jpg',
    color: 'bg-white'
  },
  {
    id: 'bienestar',
    title: 'Bienestar Comunitario',
    subtitle: 'Fomentamos el bienestar a través de iniciativas de salud y prevención que mejoran la calidad de vida.',
    description: 'La salud física y mental es la base de una comunidad próspera. Nuestro programa de Bienestar Comunitario organiza brigadas médicas, campañas de vacunación y talleres de nutrición. Además, promovemos la salud emocional a través de espacios de apoyo y actividades recreativas que fortalecen el tejido social y aseguran que nadie se quede atrás en el camino hacia una vida plena.',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
    color: 'bg-sea/5'
  },
  {
    id: 'salud-integral',
    title: 'Salud Integral',
    subtitle: 'Brindando atención médica especializada y preventiva para transformar vidas.',
    description: 'Nuestro programa de Salud Integral se enfoca en brindar atención médica especializada y preventiva a quienes más lo necesitan. A través de alianzas estratégicas, como el programa "Corazón de Niño", facilitamos diagnósticos, tratamientos y cirugías que salvan vidas, asegurando que cada niño y adulto en nuestra comunidad tenga acceso a una salud de calidad y un futuro prometedor.',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774042414/Corazon-de-nin%CC%83o-Enero-35_zkpeel.jpg',
    color: 'bg-white'
  },
  {
    id: 'espacios',
    title: 'Espacios que Transforman',
    subtitle: 'Mejoras en áreas públicas para crear un impacto a largo plazo.',
    description: 'Transformamos el entorno físico para mejorar la convivencia social. Identificamos espacios públicos en desuso o deteriorados y los rehabilitamos para convertirlos en parques, canchas deportivas o centros comunitarios vibrantes. Estas mejoras no solo embellecen la región, sino que proporcionan lugares seguros para el juego, el deporte y el encuentro ciudadano, generando un sentido de pertenencia y orgullo local.',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/biblioteca-51-1-scaled_pcxwgd.jpg',
    color: 'bg-sea/5'
  }
];

const ProgramasPage: React.FC = () => {
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
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg" 
            alt="Programas Hero" 
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
            Nuestros Programas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Cuidemos la Comunidad que nos Cuida
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-sea mb-8 font-serif">
              Cuidemos la Comunidad que nos Cuida
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              En Fundación Costa Palmas, trabajamos para impulsar el bienestar de las comunidades y proteger el entorno natural de Cabo del Este. A través de nuestros cinco programas, promovemos el desarrollo social, la educación, la sostenibilidad y la conservación ambiental, generando un impacto positivo y duradero.
            </p>
          </div>
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
                    <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={program.image} 
                        alt={program.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Decorative element */}
                    <div className={`absolute -z-10 w-full h-full border-2 border-coral rounded-3xl ${index % 2 === 0 ? '-bottom-6 -right-6' : '-bottom-6 -left-6'}`} />
                  </motion.div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-coral font-bold tracking-widest uppercase text-sm mb-4 block">Programa {index + 1}</span>
                    <h3 className="text-4xl md:text-5xl text-sea mb-6 font-serif">{program.title}</h3>
                    <p className="text-xl text-sea/80 font-medium mb-6 italic leading-snug">
                      "{program.subtitle}"
                    </p>
                    <div className="h-1 w-20 bg-coral mb-8" />
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {program.description}
                    </p>
                    <button className="px-8 py-3 bg-sea text-white rounded-full font-bold hover:bg-sea/90 transition-all shadow-lg hover:shadow-xl">
                      Saber más
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-sea font-serif mb-4">Nuestros Aliados</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestros programas son posibles gracias al apoyo y compromiso de aliados estratégicos que comparten nuestra visión de un futuro con más oportunidades para todos.
            </p>
          </div>
          <Partners />
        </div>
      </section>

      <CTASection />
    </main>
  );
};

export default ProgramasPage;
