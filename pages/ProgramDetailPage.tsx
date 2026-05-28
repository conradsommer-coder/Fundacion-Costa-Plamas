import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Heart, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath } from '../src/i18n/routes';

interface ProgramDetailMeta {
  id: string;
  image: string;
  metrics: { value: string; icon: React.ReactNode }[];
}

interface ProgramDetailCopy {
  title: string;
  description: string;
  fullDescription: string;
  metrics: string[];
  successStory: {
    title: string;
    content: string;
    author: string;
  };
  objectives: string[];
  howToHelp: string[];
}

const programData: Record<string, ProgramDetailMeta> = {
  educacion: {
    id: 'educacion',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    metrics: [
      { value: '2,854', icon: <Users className="w-6 h-6" /> },
      { value: '450+', icon: <Target className="w-6 h-6" /> },
      { value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    ],
  },
  'medio-ambiente': {
    id: 'medio-ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776801241/Tortugas2_hcp6tv.jpg',
    metrics: [
      { value: '500', icon: <Target className="w-6 h-6" /> },
      { value: '5,000+', icon: <TrendingUp className="w-6 h-6" /> },
      { value: '4,948', icon: <Heart className="w-6 h-6" /> },
    ],
  },
  'espacios-que-transforman': {
    id: 'espacios-que-transforman',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292725/Voluntariado_Popescu_pintando_kinder-012_syan92.jpg',
    metrics: [
      { value: '8', icon: <Target className="w-6 h-6" /> },
      { value: '13,223', icon: <Users className="w-6 h-6" /> },
      { value: '$2M+', icon: <TrendingUp className="w-6 h-6" /> },
    ],
  },
};

const ProgramDetailPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const { id } = useParams<{ id: string }>();
  const program = id ? programData[id] : null;
  const programCopy = program
    ? (t(`programDetail.programs.${program.id}`, { returnObjects: true }) as ProgramDetailCopy)
    : null;

  if (!program || !programCopy || typeof programCopy !== 'object') {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-bold text-sea mb-4">{t('programDetail.notFoundTitle')}</h2>
        <Link to={getLocalizedPath('home', language)} className="text-coral font-bold hover:underline">{t('programDetail.backHome')}</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={program.image} 
          alt={programCopy.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to={getLocalizedPath('home', language, { hash: 'programas' })} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t('programDetail.backPrograms')}
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">{programCopy.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              {programCopy.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-16"
            >
              <div>
                <h2 className="text-3xl font-bold text-sea mb-6">{t('programDetail.aboutProgram')}</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {programCopy.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-sea mb-8">{t('programDetail.objectivesTitle')}</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {programCopy.objectives.map((objective, i) => (
                    <motion.div 
                      key={objective} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 items-start p-6 bg-paper rounded-3xl border border-gray-100"
                    >
                      <CheckCircle2 className="w-6 h-6 text-coral shrink-0" />
                      <p className="text-gray-700 font-medium">{objective}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-sea text-white p-12 rounded-[3rem] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <Heart className="w-12 h-12 text-coral mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-3xl font-bold mb-6 italic">"{programCopy.successStory.title}"</h3>
                  <p className="text-xl text-white/80 leading-relaxed mb-8 italic">
                    {programCopy.successStory.content}
                  </p>
                  <p className="font-bold text-coral">- {programCopy.successStory.author}</p>
                </div>
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-12"
            >
              <div className="bg-paper p-8 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-2xl font-bold text-sea mb-8">{t('programDetail.realImpact')}</h3>
                <div className="space-y-8">
                  {program.metrics.map((metric, i) => (
                    <motion.div 
                      key={`${metric.value}-${programCopy.metrics[i]}`} 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-coral shadow-sm">
                        {metric.icon}
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-sea">{metric.value}</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider font-bold">{programCopy.metrics[i]}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-coral text-white p-8 rounded-[2.5rem] shadow-xl shadow-coral/20"
              >
                <h3 className="text-2xl font-bold mb-6">{t('programDetail.howToHelpTitle')}</h3>
                <ul className="space-y-4 mb-8">
                  {programCopy.howToHelp.map((item) => (
                    <li key={item} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={getLocalizedPath('donate', language)}
                  className="block w-full py-4 bg-white text-coral text-center rounded-full font-bold hover:bg-paper transition-all shadow-lg"
                >
                  {t('common.donateNow')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetailPage;
