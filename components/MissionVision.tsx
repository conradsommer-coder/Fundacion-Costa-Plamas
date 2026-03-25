import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';

const MissionVision: React.FC = () => {
  const items = [
    {
      title: 'Misión',
      description: 'Impulsar el desarrollo integral de las comunidades de Cabo del Este a través de programas sostenibles en educación, salud y medio ambiente.',
      icon: Target,
      color: 'bg-coral/10 text-coral',
    },
    {
      title: 'Visión',
      description: 'Ser el motor de transformación que convierta a Cabo del Este en un modelo de desarrollo equilibrado, donde la prosperidad humana y la conservación natural coexistan.',
      icon: Eye,
      color: 'bg-coral/10 text-coral',
    },
    {
      title: 'Valores',
      description: 'Integridad, Colaboración, Sostenibilidad y Respeto por nuestra tierra y nuestra gente son los pilares que guían cada una de nuestras acciones.',
      icon: Heart,
      color: 'bg-coral/10 text-coral',
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group">
            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl text-sea mb-4">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
