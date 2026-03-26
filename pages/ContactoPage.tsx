import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const ContactoPage: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'contacto' | 'voluntario'>('contacto');
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
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/301_uaa5nz.jpg" 
            alt="Contacto Hero" 
            className="w-full h-[130%] object-cover absolute top-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 text-center text-white pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Contáctanos
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            Estamos aquí para escucharte. Ya sea que tengas una pregunta, una sugerencia o quieras unirte a nuestro equipo de voluntarios.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-sea mb-8">Información de Contacto</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sea text-lg">Ubicación</h3>
                      <p className="text-gray-600">La Ribera, B.C.S., México</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sea text-lg">Email</h3>
                      <a href="mailto:contacto@fundacioncostapalmas.org" className="text-gray-600 hover:text-coral transition-colors">
                        contacto@fundacioncostapalmas.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-coral/10 text-coral rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sea text-lg">Teléfono</h3>
                      <p className="text-gray-600">+52 (624) 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-paper rounded-[2.5rem] border border-gray-100">
                <h3 className="text-xl font-bold text-sea mb-4">Horario de Atención</h3>
                <p className="text-gray-600 text-sm">
                  Lunes a Viernes: 9:00 AM - 5:00 PM<br />
                  Sábados: 9:00 AM - 1:00 PM
                </p>
              </div>
            </div>

            {/* Forms Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
                {/* Form Tabs */}
                <div className="flex border-b border-gray-100">
                  <button
                    onClick={() => setActiveForm('contacto')}
                    className={`flex-1 py-6 font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      activeForm === 'contacto' ? 'bg-white text-sea border-b-4 border-coral' : 'bg-gray-50 text-gray-400 hover:text-sea'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5" />
                    Contacto General
                  </button>
                  <button
                    onClick={() => setActiveForm('voluntario')}
                    className={`flex-1 py-6 font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      activeForm === 'voluntario' ? 'bg-white text-sea border-b-4 border-coral' : 'bg-gray-50 text-gray-400 hover:text-sea'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    Ser Voluntario
                  </button>
                </div>

                <div className="p-8 md:p-12">
                  {activeForm === 'contacto' ? (
                    <motion.form 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Nombre Completo</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder="Ej. Juan Pérez"
                              className="w-full pl-12 pr-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                              type="email" 
                              placeholder="juan@ejemplo.com"
                              className="w-full pl-12 pr-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-sea uppercase tracking-wider">Asunto</label>
                        <input 
                          type="text" 
                          placeholder="¿En qué podemos ayudarte?"
                          className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-sea uppercase tracking-wider">Mensaje</label>
                        <textarea 
                          rows={5}
                          placeholder="Escribe tu mensaje aquí..."
                          className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all resize-none"
                        ></textarea>
                      </div>
                      <button className="w-full py-5 bg-coral text-white rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Enviar Mensaje
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Nombre Completo</label>
                          <input 
                            type="text" 
                            placeholder="Ej. María García"
                            className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Email</label>
                          <input 
                            type="email" 
                            placeholder="maria@ejemplo.com"
                            className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Teléfono</label>
                          <input 
                            type="tel" 
                            placeholder="+52 ..."
                            className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-sea uppercase tracking-wider">Área de Interés</label>
                          <select className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all appearance-none">
                            <option>Educación</option>
                            <option>Salud</option>
                            <option>Medio Ambiente</option>
                            <option>Deportes</option>
                            <option>Otro</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-sea uppercase tracking-wider">¿Por qué quieres ser voluntario?</label>
                        <textarea 
                          rows={4}
                          placeholder="Cuéntanos un poco sobre ti y tus motivaciones..."
                          className="w-full px-4 py-4 bg-paper rounded-2xl border border-gray-100 focus:border-coral outline-none transition-all resize-none"
                        ></textarea>
                      </div>
                      <button className="w-full py-5 bg-sea text-white rounded-full font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
                        <Heart className="w-5 h-5" />
                        Postularme como Voluntario
                      </button>
                    </motion.form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactoPage;
