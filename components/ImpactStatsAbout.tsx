
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { Users, Heart, PawPrint, GraduationCap, Home, TreePine } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 1, stiffness: 40, damping: 20 });
  const display = useTransform(spring, (current) => 
    Math.round(current).toLocaleString() + suffix
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
    value: 13223, 
    icon: Home,
  },
  { 
    value: 5194, 
    icon: Heart,
  },
  { 
    value: 4948, 
    icon: PawPrint,
  },
  { 
    value: 3450, 
    icon: TreePine,
  },
  { 
    value: 3007, 
    icon: Users,
  },
  { 
    value: 2854, 
    icon: GraduationCap,
  },
];

const ImpactStatsAbout: React.FC = () => {
  const { t } = useTranslation();
  const labels = t('impactStatsAbout.labels', { returnObjects: true }) as string[];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-serif text-sea mb-8 leading-tight">
                {t('impactStatsAbout.titlePrefix')} <span className="italic text-coral">{t('impactStatsAbout.titleEmphasis')}</span> <br />
                {t('impactStatsAbout.titleSuffix')}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t('impactStatsAbout.description')}
              </p>
              <div className="w-24 h-1 bg-terracotta/30"></div>
            </motion.div>
          </div>

          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-24">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                className={`flex flex-col ${index % 2 !== 0 ? 'sm:mt-24' : ''}`}
              >
                <div className={`w-16 h-16 bg-coral/10 text-coral rounded-3xl flex items-center justify-center mb-8 shadow-sm`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className={`text-6xl md:text-7xl font-serif font-bold mb-6 tracking-tighter text-sea`}>
                  <Counter value={stat.value} />
                </div>
                <div className="text-xl font-medium text-sea/90 border-l-4 border-coral/20 pl-8 py-2 max-w-[240px]">
                  {labels[index]}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatsAbout;
