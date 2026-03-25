import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#D4745A] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-6">¿Listo para contribuir?</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Tu apoyo es fundamental para seguir construyendo un futuro próspero en Cabo del Este. Únete a nuestra causa hoy mismo.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Fundraise Up Donation Widget Trigger - Only one trigger to avoid double rendering */}
          <div className="bg-white rounded-[2rem] shadow-2xl p-2 md:p-6 min-h-[600px] flex items-center justify-center">
            <a href="#XMRYFKPU" style={{ display: 'none' }}></a>
          </div>
          
          <div className="mt-12 text-white/90">
            <p className="text-sm uppercase tracking-widest font-bold mb-3 opacity-80">O contáctanos directamente</p>
            <a 
              href="mailto:info@fundacioncostapalmas.org" 
              className="text-2xl font-serif hover:text-white transition-all border-b border-white/30 hover:border-white pb-1"
            >
              info@fundacioncostapalmas.org
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
