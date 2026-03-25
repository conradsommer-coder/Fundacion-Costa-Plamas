
import React from 'react';
import { DollarSign, Package, Users } from 'lucide-react';

const waysToHelp = [
  {
    title: 'Donativo Monetario',
    description: 'Tu aportación económica nos permite mantener y expandir nuestros programas de educación y salud.',
    icon: DollarSign,
    color: 'bg-coral/10 text-coral',
  },
  {
    title: 'Donativo en Especie',
    description: 'Recibimos materiales educativos, equipo médico y suministros que son entregados directamente a quienes los necesitan.',
    icon: Package,
    color: 'bg-coral/10 text-coral',
  },
  {
    title: 'Voluntariado',
    description: 'Tu tiempo y talento son invaluables. Únete a nuestras brigadas y proyectos comunitarios.',
    icon: Users,
    color: 'bg-coral/10 text-coral',
  },
];

const DonateSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl text-sea mb-6">Impulsa el Cambio</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Existen muchas formas de contribuir al bienestar de Cabo del Este. Cada acción, por pequeña que parezca, suma en la construcción de un futuro mejor.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {waysToHelp.map((way, index) => (
          <div key={index} className="bg-paper p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className={`w-16 h-16 ${way.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <way.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl text-sea mb-4">{way.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {way.description}
            </p>
            <button className="mt-auto text-sea font-bold border-b-2 border-sea/20 hover:border-sea transition-all pb-1">
              Saber más
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonateSection;
