
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img 
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png" 
            alt="Fundación Costa Palmas Logo" 
            className="h-20 w-auto object-contain mb-6"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-4xl md:text-5xl text-sea mb-8">¿Quiénes Somos?</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-10">
            <p>
              Fundación Costa Palmas es una organización sin fines de lucro dedicada a impulsar el desarrollo sostenible en la región de Cabo del Este, Baja California Sur.
            </p>
            <p>
              Nacimos con la convicción de que el crecimiento de una región debe ir de la mano con el bienestar de su gente y la protección de su entorno natural. Trabajamos en estrecha colaboración con las comunidades locales para identificar necesidades y co-crear soluciones que generen un impacto positivo y duradero.
            </p>
          </div>
          <Link 
            to="/nosotros" 
            className="inline-block px-10 py-4 bg-sea text-white rounded-full font-bold hover:bg-sea/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Conoce más sobre nosotros
          </Link>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774041928/FOTO-NINAS-scaled_1_lw1phs.jpg" 
              alt="Comunidad local" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-coral/20 rounded-full -z-10"></div>
          <div className="absolute -top-6 -right-6 w-48 h-48 bg-sea/10 rounded-full -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
