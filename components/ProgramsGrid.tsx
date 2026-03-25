
import React from 'react';

import { Link } from 'react-router-dom';

const programs = [
  {
    title: 'Educación',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774036983/DSC00965_nzdx6q.jpg',
    href: '/programas#educacion'
  },
  {
    title: 'Medio Ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774043917/DJI_0447_eztgmz.jpg',
    href: '/programas#medio-ambiente'
  },
  {
    title: 'Bienestar Comunitario',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
    href: '/programas#bienestar'
  },
  {
    title: 'Salud Integral',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774042414/Corazon-de-nin%CC%83o-Enero-35_zkpeel.jpg',
    href: '/programas#salud-integral'
  },
  {
    title: 'Espacios que Transforman',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/biblioteca-51-1-scaled_pcxwgd.jpg',
    href: '/programas#espacios'
  },
];

const ProgramsGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-sea mb-4 font-serif">Cuidemos la Comunidad que nos Cuida</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          En Fundación Costa Palmas, trabajamos para impulsar el bienestar de las comunidades y proteger el entorno natural de Cabo del Este.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {programs.map((program, index) => (
          <Link 
            key={index} 
            to={program.href}
            className={`group relative rounded-[2rem] overflow-hidden shadow-lg cursor-pointer block transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
              index < 2 
                ? 'md:col-span-3 aspect-[16/10] md:aspect-[16/9]' 
                : 'md:col-span-2 aspect-[4/5] md:aspect-[3/4]'
            }`}
          >
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="text-coral text-xs font-bold tracking-widest uppercase mb-2 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                Programa {index + 1}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl text-white font-serif leading-tight transition-colors duration-300 group-hover:text-coral">
                {program.title}
              </h3>
              <div className="w-0 h-0.5 bg-coral mt-4 transition-all duration-500 group-hover:w-12"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProgramsGrid;
