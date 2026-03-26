import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const DonarPage: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const fu = (window as any).FundraiseUp;
      if (fu && typeof fu.call === 'function') {
        fu.call('reinit');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="flex-grow pt-24">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            style={{ y }}
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774467200/FOTO-TRES-MOCHILAS_v9fdsg.jpg" 
            alt="Donar Hero" 
            className="w-full h-[130%] object-cover absolute top-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white pt-24">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037190/ChatGPT_Image_Mar_10_2026_07_50_31_PM_d3ympz.png" 
            alt="Fundación Costa Palmas Logo" 
            className="h-20 mx-auto mb-8 object-contain brightness-0 invert"
            referrerPolicy="no-referrer"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Tu generosidad transforma vidas
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Cada donación, sin importar el tamaño, nos ayuda a construir un futuro más brillante para las comunidades de Cabo del Este.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-sea mb-6">¿Por qué donar?</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Tu apoyo financiero nos permite mantener y expandir nuestros programas esenciales en educación, salud y conservación ambiental. Somos una organización transparente comprometida con el impacto real.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="p-6 bg-paper rounded-3xl border border-gray-100">
                  <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sea mb-2">Transparencia</h3>
                  <p className="text-gray-600 text-sm">Reportes anuales detallados sobre el uso de cada peso donado.</p>
                </div>
                <div className="p-6 bg-paper rounded-3xl border border-gray-100">
                  <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sea mb-2">Impacto Directo</h3>
                  <p className="text-gray-600 text-sm">El 90% de las donaciones van directamente a programas comunitarios.</p>
                </div>
                <div className="p-6 bg-paper rounded-3xl border border-gray-100">
                  <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sea mb-2">Comunidad</h3>
                  <p className="text-gray-600 text-sm">Trabajamos mano a mano con los líderes locales para identificar necesidades.</p>
                </div>
                <div className="p-6 bg-paper rounded-3xl border border-gray-100">
                  <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-sea mb-2">Sostenibilidad</h3>
                  <p className="text-gray-600 text-sm">Proyectos diseñados para perdurar y empoderar a largo plazo.</p>
                </div>
              </div>

              <div className="p-8 bg-desert rounded-[2.5rem] border border-gray-200">
                <h3 className="text-2xl font-bold text-sea mb-4 italic">Otras formas de ayudar</h3>
                <p className="text-gray-700 mb-6">
                  Si prefieres realizar una transferencia bancaria o donar en especie, por favor contáctanos directamente.
                </p>
                <a 
                  href="mailto:contacto@fundacioncostapalmas.org" 
                  className="inline-flex items-center gap-2 text-sea font-bold hover:underline"
                >
                  contacto@fundacioncostapalmas.org
                </a>
              </div>
            </div>

            {/* Right Column: Donation Form */}
            <div className="bg-paper p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 sticky top-32">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-sea mb-2">Haz tu donación</h3>
                <p className="text-gray-500 mb-8">Seguro y rápido a través de nuestra plataforma</p>
              </div>
              
              <div className="min-h-[400px]">
                {/* Fundraise Up Embedded Widget */}
                <div data-fundraiseup-embed="XMRYFKPU"></div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">Donación Segura</p>
                <div className="flex justify-center gap-6 items-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/512px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/512px-PayPal.svg.png" alt="PayPal" className="h-5" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DonarPage;
