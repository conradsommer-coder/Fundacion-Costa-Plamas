import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MissionVisionCopy {
  title: string;
  description: string;
}

const MissionVision: React.FC = () => {
  const { t } = useTranslation();
  const itemCopy = t('missionVision.items', { returnObjects: true }) as MissionVisionCopy[];
  const items = [
    {
      icon: Target,
      color: 'bg-coral/10 text-coral',
    },
    {
      icon: Eye,
      color: 'bg-coral/10 text-coral',
    },
    {
      icon: Heart,
      color: 'bg-coral/10 text-coral',
    },
  ];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <p className="text-coral font-bold uppercase tracking-widest text-sm mb-4">{t('missionVision.eyebrow')}</p>
        <h2 className="text-4xl md:text-5xl text-sea">{t('missionVision.title')}</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group">
            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl text-sea mb-4">{itemCopy[index].title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {itemCopy[index].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
