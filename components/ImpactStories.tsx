import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const stories = [
  {
    id: 'proteccion-palmar',
    title: 'Un compromiso con la protección del Palmar',
    date: '17 Abr 2025',
    category: 'Medio Ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
  },
  {
    id: 'diagnostico-corazon',
    title: 'Un diagnóstico a tiempo puede cambiarlo todo',
    date: '08 May 2026',
    category: 'Salud',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Corazon-de-nin%CC%83o-Enero-14_hiedwq.jpg',
  },
  {
    id: 'becas-uabcs',
    title: 'Invertir en educación es invertir en el futuro de la comunidad',
    date: '08 May 2026',
    category: 'Educación',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195691/DSC02253_e2kb92.jpg',
  },
  {
    id: 'campana-vacunacion',
    title: 'Exitosa campaña de vacunación para 100 mascotas',
    date: '17 Abr 2025',
    category: 'Salud',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
  },
];

interface ImpactStoriesProps {
  showTitle?: boolean;
}

const ImpactStories: React.FC<ImpactStoriesProps> = ({ showTitle = true }) => {
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
          {showTitle && <h2 className="text-4xl md:text-5xl text-sea mb-8 font-serif">Historias de Impacto</h2>}
          <p className="text-xl md:text-2xl text-sea/80 leading-relaxed font-light italic">
            "Detrás de cada iniciativa de Fundación Costa Palmas hay personas, experiencias y logros que nos motivan a seguir adelante."
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
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-sea shadow-sm">
                  {story.category}
                </div>
              </div>
              <div className="flex-grow px-2">
                <h3 className="text-2xl md:text-3xl text-sea mb-4 font-serif leading-tight group-hover:text-coral transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="text-gray-400 text-sm mb-8 font-medium">{story.date}</p>
                <Link 
                  to={`/historias/${story.id}`}
                  className="inline-flex items-center px-8 py-3 bg-sea text-white rounded-full text-xs font-bold tracking-widest hover:bg-coral transition-all uppercase shadow-lg hover:shadow-coral/20"
                >
                  Leer más
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
