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
  're-inauguracion-cancha': {
    title: 'Re-inauguración de la cancha de usos múltiples',
    date: '17 Abr 2025',
    category: 'Comunidad',
    image: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774390865/biblioteca-51-1-scaled_pcxwgd.jpg',
    content: `
      <p>El deporte y la recreación son pilares del bienestar comunitario. Con gran entusiasmo, celebramos la re-inauguración de la cancha de usos múltiples, un espacio diseñado para el encuentro, el juego y el sano esparcimiento de niños, jóvenes y adultos.</p>
      
      <p>Este proyecto fue posible gracias a la colaboración entre la Fundación, las autoridades locales y los propios vecinos, quienes participaron activamente en las jornadas de rehabilitación. La nueva cancha cuenta con iluminación LED, tableros nuevos y un recubrimiento especial de alta durabilidad.</p>
      
      <p>Durante el evento de inauguración, contamos con la presencia de familias de toda la región, quienes disfrutaron de un torneo relámpago de básquetbol y actividades recreativas para los más pequeños. Fue un día lleno de alegría y convivencia que nos recordó la importancia de contar con espacios públicos de calidad.</p>
      
      <p>Más que una obra de infraestructura, este espacio representa nuestro compromiso con el fortalecimiento del tejido social. Aquí se forjarán amistades, se aprenderán valores de trabajo en equipo y se promoverá un estilo de vida saludable para todos.</p>
      
      <p>Agradecemos a todos los que hicieron posible este sueño. Seguiremos trabajando para transformar más espacios y crear más oportunidades para nuestra comunidad en Cabo del Este.</p>
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
