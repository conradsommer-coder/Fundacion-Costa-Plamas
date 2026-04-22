import React from 'react';
import { Link } from 'react-router-dom';

const partners = [
  { name: 'CROC', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292707/logo_croc_vrah64.png' },
  { name: 'UABCS', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776815050/logo-universidad-autonoma-de-baja-california-sur_gnvjqv.webp' },
  { name: 'CRIT', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/color_v_kawyay.png' },
  { name: 'Corazón de Niño', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292710/Logo-ACDN-pantalla_s0i8bf.png' },
  { name: 'Red Autismo', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292719/RA-Logotipo_byb59e.png' },
  { name: 'ZOFEMAT', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/ZOFEMAT_wlr8ua.jpg' },
  { name: 'Aliado', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292690/607962733_122095581807203157_1272613460739661110_n_yoh1cu.jpg' },
  { name: 'Aliado 2', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292711/logo_ra4o3f.png' },
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
