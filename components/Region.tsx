import React from 'react';

const locations = [
  { name: 'La Ribera', image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774048042/Gemini_Generated_Image_jvhgs8jvhgs8jvhg_ohsrtl.png' },
  { name: 'Santiago', image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774048043/Gemini_Generated_Image_w2djgfw2djgfw2dj_1_z2lgxn.png' },
  { name: 'Miraflores', image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774048052/Gemini_Generated_Image_tt0r7ntt0r7ntt0r_v4439v.png' },
];

const Region: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl text-sea mb-8">Nuestra Región</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Cabo del Este es una región de contrastes asombrosos, donde el desierto se encuentra con el Mar de Cortés. Es el hogar de comunidades vibrantes con una rica herencia cultural y una biodiversidad única en el mundo.
            </p>
            <p>
              Nuestra labor se extiende a lo largo de diversas comunidades, cada una con su propia identidad y desafíos, pero unidas por el deseo de un futuro próspero.
            </p>
          </div>
        </div>
        
        <div className="rounded-3xl overflow-hidden shadow-xl border border-paper/10">
          <img 
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037190/MAPA-EN-ESPANOL_ftsgz1.png" 
            alt="Mapa de Cabo del Este" 
            className="w-full h-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {locations.map((loc, index) => (
          <div key={index} className="group relative aspect-[16/10] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
            <img 
              src={loc.image} 
              alt={loc.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-4">
              <span className="text-white font-bold text-lg">{loc.name}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Region;
