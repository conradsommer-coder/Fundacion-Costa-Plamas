import React from 'react';
import { Link } from 'react-router-dom';

const stories = [
  {
    id: 'proteccion-palmar',
    title: 'Un compromiso con la protección del Palmar',
    date: '17 Abr 2025',
    category: 'Medio Ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
  },
  {
    id: 're-inauguracion-cancha',
    title: 'Re-inauguración de la cancha de usos múltiples',
    date: '17 Abr 2025',
    category: 'Comunidad',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/biblioteca-51-1-scaled_pcxwgd.jpg',
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
  return (
    <div className="bg-[#F5F2E8] py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          {showTitle && <h2 className="text-4xl md:text-5xl text-sea mb-8">Historias de Impacto</h2>}
          <p className="text-xl md:text-2xl text-sea/80 leading-relaxed font-light">
            Detrás de cada iniciativa de Fundación Costa Palmas hay personas, experiencias y logros que nos motivan a seguir adelante. En esta sección, compartimos historias de impacto sobre los programas y proyectos en nuestra comunidad. ¡Descubre más sobre nuestro trabajo y únete al cambio!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {stories.map((story, index) => (
            <div key={index} className="flex flex-col group">
              <div className="aspect-[4/3] overflow-hidden rounded-sm mb-6 shadow-md relative">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-sea">
                  {story.category}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl text-sea mb-4 font-serif leading-tight group-hover:text-coral transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-400 text-sm mb-8">{story.date}</p>
                <Link 
                  to={`/historias/${story.id}`}
                  className="inline-block px-8 py-2.5 bg-[#94A3B8] text-white rounded-full text-sm font-bold tracking-wider hover:bg-sea transition-all uppercase"
                >
                  Leer más
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStories;
