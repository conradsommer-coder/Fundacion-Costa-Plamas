import React, { useState } from 'react';
import DonationModal from './DonationModal';
import { useTranslation } from 'react-i18next';

const CTASection: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-[#D4745A] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            {t('cta.description')}
          </p>
          <p className="mt-4 text-white/70 italic text-sm">
            {t('cta.taxNote')}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Fundraise Up Donation Widget Embedded */}
          <div className="bg-white rounded-[2rem] shadow-2xl p-2 md:p-6 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            <a href="#XMRYFKPU" data-fundraise-up-embed></a>
          </div>

          <div className="mt-12 mb-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-5 bg-white text-sea rounded-full font-bold text-lg hover:bg-paper transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
            >
              <span>{t('cta.optionsButton')}</span>
              <div className="w-6 h-6 bg-coral/10 rounded-full flex items-center justify-center text-coral">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </button>
          </div>
          
          <div className="text-white/90">
            <p className="text-sm uppercase tracking-widest font-bold mb-3 opacity-80">{t('cta.contactLabel')}</p>
            <a 
              href="mailto:fundacion@costapalmas.com" 
              className="text-2xl font-serif hover:text-white transition-all border-b border-white/30 hover:border-white pb-1"
            >
              fundacion@costapalmas.com
            </a>
          </div>
        </div>
      </div>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CTASection;
