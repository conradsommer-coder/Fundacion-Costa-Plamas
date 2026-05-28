import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import CTASection from '../components/CTASection';
import { useTranslation } from 'react-i18next';
import { getLanguageFromValue, getLocalizedPath, getStoryIdFromSlug } from '../src/i18n/routes';

interface StoryCopy {
  title: string;
  date: string;
  category: string;
  content: string;
}

const stories = {
  'proteccion-palmar': {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
  },
  'diagnostico-corazon': {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Corazon-de-nin%CC%83o-Enero-14_hiedwq.jpg',
  },
  'becas-uabcs': {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195691/DSC02253_e2kb92.jpg',
  },
  'campana-vacunacion': {
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
  },
};

const HistoriaDetailPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = getLanguageFromValue(i18n.resolvedLanguage || i18n.language);
  const { id: storySlug } = useParams<{ id: string }>();
  const id = getStoryIdFromSlug(storySlug);
  const storyMeta = stories[id as keyof typeof stories];
  const story = id && storyMeta
    ? (t(`stories.items.${id}`, { returnObjects: true }) as StoryCopy)
    : null;

  if (!storyMeta || !story || typeof story !== 'object') {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-serif text-sea mb-8">{t('storyDetail.notFoundTitle')}</h1>
        <Link to={getLocalizedPath('stories', language)} className="text-coral font-bold hover:underline">{t('storyDetail.backStories')}</Link>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-24 overflow-hidden">
      <article className="bg-white">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={getLocalizedPath('stories', language)} className="inline-flex items-center gap-2 text-gray-500 hover:text-sea transition-colors mb-12 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>{t('storyDetail.backStories')}</span>
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 text-gray-400 mb-6 text-sm"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {story.date}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                {t('storyDetail.readingTime')}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="uppercase tracking-widest font-bold text-coral">{story.category}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif text-sea mb-12 leading-tight"
            >
              {story.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="aspect-[16/9] rounded-3xl overflow-hidden mb-16 shadow-2xl"
            >
              <img 
                src={storyMeta.image} 
                alt={story.title} 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid lg:grid-cols-[1fr_250px] gap-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg prose-sea max-w-none"
              >
                <div dangerouslySetInnerHTML={{ __html: story.content }} className="space-y-8 text-gray-600 leading-relaxed text-lg font-light" />
              </motion.div>

              <motion.aside 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-12"
              >
                <div className="p-8 bg-paper rounded-3xl border border-gray-100">
                  <h4 className="text-sea font-bold mb-6 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    {t('storyDetail.share')}
                  </h4>
                  <div className="flex gap-4">
                    <motion.button whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-sea hover:shadow-md transition-all">
                      <Facebook className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-sea hover:shadow-md transition-all">
                      <Twitter className="w-5 h-5" />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-sea hover:shadow-md transition-all">
                      <Instagram className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-8 bg-sea text-white rounded-3xl shadow-xl"
                >
                  <h4 className="text-xl font-serif mb-4">{t('storyDetail.changeTitle')}</h4>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">
                    {t('storyDetail.changeDescription')}
                  </p>
                  <Link to={getLocalizedPath('donate', language)} className="block text-center py-3 bg-coral text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg">
                    {t('common.donateNow')}
                  </Link>
                </motion.div>
              </motion.aside>
            </div>

            <div className="mt-24 pt-16 border-t border-gray-100">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-serif text-sea mb-12"
              >
                {t('storyDetail.relatedStories')}
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(stories)
                  .filter(([key]) => key !== id)
                  .slice(0, 2)
                  .map(([key, storyListMeta], i) => {
                    const relatedStory = t(`stories.items.${key}`, { returnObjects: true }) as StoryCopy;

                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <Link to={getLocalizedPath('story', language, { storyId: key })} className="group">
                          <div className="aspect-video rounded-2xl overflow-hidden mb-4 shadow-md">
                            <motion.img 
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.5 }}
                              src={storyListMeta.image} 
                              alt={relatedStory.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <h4 className="text-xl font-serif text-sea group-hover:text-coral transition-colors">{relatedStory.title}</h4>
                          <p className="text-gray-400 text-sm mt-2">{relatedStory.date}</p>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </article>

      <CTASection />
    </main>
  );
};

export default HistoriaDetailPage;
