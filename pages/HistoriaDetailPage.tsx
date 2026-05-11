import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Facebook, Twitter, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import CTASection from '../components/CTASection';

const stories = {
  'proteccion-palmar': {
    title: 'Un compromiso con la protección del Palmar',
    date: '17 Abr 2025',
    category: 'Medio Ambiente',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/SANTIAGO-CLEANUP-39-scaled_eewtyy.jpg',
    content: `
      <p>La protección de nuestros ecosistemas es una de las prioridades fundamentales de Fundación Costa Palmas. El Palmar de Cabo del Este no es solo un paisaje hermoso, es un pulmón vital para nuestra región y un hogar para innumerables especies.</p>
      
      <p>A través de este compromiso, hemos implementado programas de monitoreo y conservación que involucran a la comunidad local. Creemos que la educación ambiental es la clave para asegurar que las futuras generaciones puedan disfrutar de esta riqueza natural.</p>
      
      <p>Durante el último año, hemos logrado reforestar áreas críticas y establecer zonas de protección que han permitido la recuperación de la fauna local. Este es solo el comienzo de un esfuerzo a largo plazo por mantener el equilibrio ecológico de nuestra casa.</p>
      
      <p>Nuestras brigadas de limpieza y mantenimiento trabajan semanalmente para asegurar que los senderos y áreas de anidación permanezcan libres de residuos. Además, hemos iniciado un programa de educación en escuelas locales para que los niños comprendan el valor de su entorno natural.</p>
    `
  },
  'diagnostico-corazon': {
    title: 'Un diagnóstico a tiempo puede cambiarlo todo',
    date: '08 May 2026',
    category: 'Salud',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Corazon-de-nin%CC%83o-Enero-14_hiedwq.jpg',
    content: `
      <p>Para muchas familias en Cabo del Este, una consulta con un especialista no siempre está al alcance. Y cuando se trata del corazón, el tiempo es clave.</p>
      <p>Con esta realidad en mente, Fundación Costa Palmas, en alianza con Corazón de Niño, impulsó un programa de detección de cardiopatías pediátricas en La Ribera, enfocado en niñas, niños y adolescentes de 0 a 18 años.</p>
      <p>A través de seis meses de trabajo y mediante un proceso que incluyó desde la detección en escuelas hasta valoraciones médicas especializadas, el programa logró acercar estos servicios a la comunidad.</p>
      <p>En total, 447 niñas, niños y adolescentes fueron tamizados, de los cuales 81 fueron citados para evaluación y 58 recibieron atención médica especializada.</p>
      <p>Estos resultados reflejan la importancia de detectar a tiempo, especialmente porque detrás de cada número hay una historia que pudo haber pasado desapercibida.</p>
      <p>Kimberly, de 18 años, fue una de las jóvenes identificadas durante el proceso. Hoy se encuentra en evaluación para definir si requiere un procedimiento especializado. Obed, de 17 años, fue diagnosticado con una condición congénita que necesita seguimiento para prevenir complicaciones en el futuro. Dante, de 13 años, continúa en estudio por una posible arritmia, bajo monitoreo médico.</p>
      <p>Historias como estas reflejan el valor de acercar la salud a la comunidad. Además, el programa permitió detectar otras condiciones que también requieren atención, ampliando su impacto más allá de su objetivo inicial.</p>
      <p>Este esfuerzo fue posible gracias al trabajo conjunto de especialistas, personal médico local y aliados estratégicos, demostrando que cuando el acceso, la detección y el acompañamiento se alinean, el impacto es real.</p>
    `
  },
  'becas-uabcs': {
    title: 'Invertir en educación es invertir en el futuro de la comunidad',
    date: '08 May 2026',
    category: 'Educación',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195691/DSC02253_e2kb92.jpg',
    content: `
      <p>En Cabo del Este, acceder a la educación superior es un paso importante, pero no siempre es fácil mantenerse en ella. Para muchos jóvenes, continuar sus estudios implica enfrentar retos económicos que pueden poner en pausa su formación.</p>
      <p>Con esta realidad en mente, Fundación Costa Palmas, en colaboración con la Universidad Autónoma de Baja California Sur – Campus La Ribera, impulsó el Programa de Becas Costa Palmas, una iniciativa enfocada en apoyar a estudiantes universitarios de la región.</p>
      <p>A través de la firma de este convenio, se fortalece el compromiso por generar más oportunidades educativas para jóvenes de la comunidad, facilitando su permanencia en la educación superior.</p>
      <p>Actualmente, 22 de los 34 estudiantes del campus La Ribera reciben la Beca Costa Palmas, un apoyo que les permite continuar con sus estudios y avanzar en la construcción de su futuro profesional.</p>
      <p>Más allá del apoyo económico, este programa representa una apuesta por el talento local y por el desarrollo a largo plazo de la región.</p>
      <p>Porque cuando un joven continúa su educación, no solo cambia su futuro. También transforma el de su comunidad.</p>
    `
  },
  'campana-vacunacion': {
    title: 'Exitosa campaña de vacunación para 100 mascotas',
    date: '17 Abr 2025',
    category: 'Salud',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774393577/Gemini_Generated_Image_uuxvyyuuxvyyuuxv_nhlm2a.png',
    content: `
      <p>La salud pública también incluye el bienestar de nuestros animales de compañía. Recientemente, llevamos a cabo una jornada de vacunación y desparasitación que benefició a más de 100 mascotas de la comunidad.</p>
      
      <p>Esta iniciativa busca prevenir enfermedades zoonóticas y promover la tenencia responsable. Contamos con el apoyo de veterinarios voluntarios y un equipo de jóvenes entusiastas que ayudaron en la logística y registro de los pacientes peludos.</p>
      
      <p>Estamos convencidos de que una comunidad que cuida a sus animales es una comunidad más empática y saludable. Agradecemos a todas las familias que se acercaron y demostraron su compromiso con la salud de sus mascotas.</p>
      
      <p>Además de las vacunas, ofrecimos charlas breves sobre nutrición y cuidados básicos, asegurando que los dueños tengan la información necesaria para brindar una vida digna a sus compañeros. Próximamente anunciaremos nuevas fechas para continuar con este importante programa.</p>
    `
  }
};

const HistoriaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const story = stories[id as keyof typeof stories];

  if (!story) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h1 className="text-4xl font-serif text-sea mb-8">Historia no encontrada</h1>
        <Link to="/historias" className="text-coral font-bold hover:underline">Volver a Historias</Link>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-24 overflow-hidden">
      {/* Article Header */}
      <article className="bg-white">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/historias" className="inline-flex items-center gap-2 text-gray-500 hover:text-sea transition-colors mb-12 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Volver a Historias</span>
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
                3 min de lectura
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
                src={story.image} 
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
                    Compartir
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
                  <h4 className="text-xl font-serif mb-4">¿Quieres ser parte del cambio?</h4>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">
                    Tu apoyo nos permite seguir creando historias de éxito en nuestra comunidad.
                  </p>
                  <Link to="/donar" className="block text-center py-3 bg-coral text-white rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg">
                    Donar ahora
                  </Link>
                </motion.div>
              </motion.aside>
            </div>

            {/* Related Stories */}
            <div className="mt-24 pt-16 border-t border-gray-100">
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-serif text-sea mb-12"
              >
                Otras Historias
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(stories)
                  .filter(([key]) => key !== id)
                  .slice(0, 2)
                  .map(([key, s], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <Link to={`/historias/${key}`} className="group">
                        <div className="aspect-video rounded-2xl overflow-hidden mb-4 shadow-md">
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            src={s.image} 
                            alt={s.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <h4 className="text-xl font-serif text-sea group-hover:text-coral transition-colors">{s.title}</h4>
                        <p className="text-gray-400 text-sm mt-2">{s.date}</p>
                      </Link>
                    </motion.div>
                  ))}
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
