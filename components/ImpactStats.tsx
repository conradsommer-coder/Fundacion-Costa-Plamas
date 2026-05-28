
import React, { useEffect, useState, useRef } from 'react';
import { Users, Heart, PawPrint, GraduationCap, Home, TreePine } from 'lucide-react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';

const Counter = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 30 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const stats = [
  { 
    value: 2854, 
    icon: GraduationCap 
  },
  { 
    value: 5194, 
    icon: Heart 
  },
  { 
    value: 4948, 
    icon: PawPrint 
  },
  { 
    value: 13223, 
    icon: Home 
  },
  { 
    value: 3450, 
    icon: TreePine 
  },
  { 
    value: 3007, 
    icon: Users 
  },
];

const ImpactStats: React.FC = () => {
  const { t } = useTranslation();
  const labels = t('impactStats.labels', { returnObjects: true }) as string[];

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl mb-4 text-white">{t('impactStats.title')}</h2>
        <p className="text-white/80 max-w-2xl mx-auto">
          {t('impactStats.description')}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white">
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
              <Counter value={stat.value} />
            </div>
            <div className="text-sm text-white/70 font-medium leading-tight">
              {labels[index]}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImpactStats;
