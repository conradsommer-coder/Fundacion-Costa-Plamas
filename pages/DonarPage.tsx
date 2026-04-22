import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Heart, ShieldCheck, TrendingUp, Users, ExternalLink, Copy, Check } from 'lucide-react';
import DonationModal from '../components/DonationModal';

const DonarPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankInfo = {
    titular: 'Fundación Costa Palmas AC',
    banco: 'Grupo Financiero Banorte',
    cuenta: '1185854781',
    clabe: '072 045 01185854781 0'
  };

  const heroRef = useRef<HTMLElement>(null);
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
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-white text-sea rounded-full font-bold uppercase tracking-widest hover:bg-paper transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
            >
              <span>Formas para donar</span>
              <ExternalLink className="w-5 h-5 text-coral" />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column: Information */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-bold text-sea mb-6 font-serif underline decoration-coral/30 decoration-8 underline-offset-8">¿Por qué donar?</h2>
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
                  <p className="text-gray-600 text-sm">Las donaciones van directamente a programas comunitarios.</p>
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

              <div className="p-10 bg-desert rounded-[2.5rem] border border-gray-200 shadow-sm">
                <h3 className="text-3xl font-bold text-sea mb-6 font-serif italic">Donativos Deducibles en México</h3>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Los donantes mexicanos pueden recibir un recibo deducible de impuestos al realizar una transferencia bancaria a la siguiente cuenta:
                </p>
                
                <div className="space-y-6 bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-white/60 mb-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Banco</label>
                    <p className="text-sea font-bold text-xl">{bankInfo.banco}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Cuenta en Pesos</label>
                      <div className="flex items-center gap-2">
                        <p className="text-sea font-mono font-bold text-lg">{bankInfo.cuenta}</p>
                        <button 
                          onClick={() => copyToClipboard(bankInfo.cuenta, 'cuenta_p')}
                          className="text-coral hover:scale-110 transition-transform p-1"
                        >
                          {copiedField === 'cuenta_p' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">CLABE</label>
                      <div className="flex items-center gap-2">
                        <p className="text-sea font-mono font-bold text-lg">{bankInfo.clabe}</p>
                        <button 
                          onClick={() => copyToClipboard(bankInfo.clabe, 'clabe_p')}
                          className="text-coral hover:scale-110 transition-transform p-1"
                        >
                          {copiedField === 'clabe_p' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full md:w-auto px-10 py-5 bg-sea text-white rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-3"
                  >
                    <span>Ver Formas de Donar</span>
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col">
                    <p className="text-gray-600 text-sm mb-1">
                      Si requieres un recibo deducible envía un correo a:
                    </p>
                    <a 
                      href="mailto:fundacion@costapalmas.com" 
                      className="text-lg font-bold text-coral hover:bg-white inline-block border-b-2 border-coral transition-colors"
                    >
                      fundacion@costapalmas.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Donation Form Container */}
            <div className="bg-paper p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-100 sticky top-32 overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-sea mb-2">Haz tu donación</h3>
                <p className="text-gray-500 mb-6">Seguro y rápido a través de nuestra plataforma</p>
                
                {/* Fundraise Up Embedded Form */}
                <div className="min-h-[400px] mb-8 bg-white rounded-2xl p-2 relative">
                   <a href="#XMRYFKPU" data-fundraise-up-embed></a>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full text-center px-12 py-5 bg-paper text-sea border-2 border-sea rounded-full font-bold text-lg hover:bg-sea hover:text-white transition-all hover:scale-105"
                  >
                    Otras formas (Transferencia)
                  </button>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">Donación Segura</p>
                <div className="flex justify-center items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
                  <img 
                    src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774566258/Untitled_design_52_lenavp.png" 
                    alt="Métodos de pago" 
                    className="h-8 md:h-10 object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};

export default DonarPage;
