import React from 'react';
import { Link } from 'react-router-dom';

const partners = [
  { name: 'Costa Palmas', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050649/1.-costa-palmas_rk5gae.png' },
  { name: 'Red Autismo', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050645/LOGO-RED-AUTISMO-r4gvgm829i3jxgng974uoi8y8029gp2hp2ncf4acxs_li91i4.png' },
  { name: 'Amigos de los Animales', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050646/LOGO-AMIGOS-ANIMALES-r4gvgjejozzoymrjpnwyz0ykfug5tlraooovzaejgg_gvwlrl.png' },
  { name: 'Aliado 4', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050645/images_1_bivquk.png' },
];

const Partners: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {partners.map((partner, index) => (
          <div 
            key={index} 
            className="h-32 w-full max-w-[200px] flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="max-h-full max-w-full object-contain mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          to="/contacto"
          className="inline-block px-10 py-4 border-2 border-sea text-sea rounded-full font-bold hover:bg-sea hover:text-white transition-all"
        >
          Contáctanos
        </Link>
      </div>
    </>
  );
};

export default Partners;
