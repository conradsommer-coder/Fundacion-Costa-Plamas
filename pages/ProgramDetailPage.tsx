import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Heart, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgramDetail {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  metrics: { label: string; value: string; icon: React.ReactNode }[];
  successStory: {
    title: string;
    content: string;
    author: string;
  };
  objectives: string[];
  howToHelp: string[];
}

const programData: Record<string, ProgramDetail> = {
  'educacion': {
    id: 'educacion',
    title: 'Educación',
    description: 'Empoderando a nuestra comunidad a través de talleres y capacitación.',
    fullDescription: 'Nuestro programa educativo se enfoca en cerrar la brecha de oportunidades en Cabo del Este. Creemos que la educación es la herramienta más poderosa para el cambio social y económico. Trabajamos con escuelas locales, centros comunitarios y expertos para ofrecer programas que van desde la alfabetización básica hasta la capacitación técnica avanzada.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
    metrics: [
      { label: 'Estudiantes beneficiados', value: '1,200+', icon: <Users className="w-6 h-6" /> },
      { label: 'Talleres impartidos', value: '450', icon: <Target className="w-6 h-6" /> },
      { label: 'Tasa de graduación', value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    ],
    successStory: {
      title: 'El sueño de María',
      content: 'María, una joven de La Ribera, pudo completar su certificación técnica gracias a nuestras becas. Hoy trabaja en el sector turístico local, apoyando a su familia y motivando a otros jóvenes.',
      author: 'María G., Graduada del programa',
    },
    objectives: [
      'Mejorar la infraestructura de las escuelas locales.',
      'Proporcionar becas para estudios superiores y técnicos.',
      'Implementar programas de educación ambiental en todas las escuelas.',
      'Ofrecer talleres de habilidades digitales para adultos.',
    ],
    howToHelp: [
      'Donar útiles escolares y equipo tecnológico.',
      'Patrocinar una beca para un estudiante local.',
      'Ser mentor voluntario en talleres técnicos.',
    ],
  },
  'medio-ambiente': {
    id: 'medio-ambiente',
    title: 'Medio Ambiente',
    description: 'Impulsando el cuidado del medio ambiente e inspirando a los niños a proteger nuestros recursos naturales.',
    fullDescription: 'Cabo del Este posee una biodiversidad única que debemos proteger. Nuestro programa ambiental combina la conservación directa con la educación comunitaria. Desde la protección de tortugas marinas hasta la gestión de residuos, trabajamos para asegurar que las futuras generaciones hereden un entorno saludable y vibrante.',
    image: 'https://images.unsplash.com/photo-1559027615-cd26735550b4?q=80&w=2067&auto=format&fit=crop',
    metrics: [
      { label: 'Área protegida (ha)', value: '500', icon: <Target className="w-6 h-6" /> },
      { label: 'Árboles plantados', value: '5,000+', icon: <TrendingUp className="w-6 h-6" /> },
      { label: 'Tortugas liberadas', value: '10,000+', icon: <Heart className="w-6 h-6" /> },
    ],
    successStory: {
      title: 'Guardianes del Mar',
      content: 'Un grupo de niños locales formó el club "Guardianes del Mar" después de participar en nuestras limpiezas de playa. Ahora lideran iniciativas de reciclaje en su comunidad.',
      author: 'Comunidad de Cabo del Este',
    },
    objectives: [
      'Proteger los sitios de anidación de tortugas marinas.',
      'Restaurar ecosistemas locales mediante la reforestación.',
      'Implementar sistemas de gestión de residuos y reciclaje.',
      'Educar a la comunidad sobre el uso responsable del agua.',
    ],
    howToHelp: [
      'Participar en jornadas de limpieza de playas.',
      'Adoptar un nido de tortuga simbólicamente.',
      'Reducir el uso de plásticos en la comunidad.',
    ],
  },
  'bienestar-comunitario': {
    id: 'bienestar-comunitario',
    title: 'Bienestar Comunitario',
    description: 'Fomentamos el bienestar a través de iniciativas de salud y prevención que mejoran la calidad de vida.',
    fullDescription: 'La salud y el bienestar son la base de una comunidad próspera. Nuestro programa de Bienestar Comunitario se enfoca en el acceso a servicios de salud preventivos, nutrición y apoyo emocional. Trabajamos para que cada miembro de la comunidad tenga las herramientas necesarias para vivir una vida plena y saludable.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    metrics: [
      { label: 'Consultas médicas', value: '2,500+', icon: <Users className="w-6 h-6" /> },
      { label: 'Familias apoyadas', value: '800', icon: <Heart className="w-6 h-6" /> },
      { label: 'Programas de nutrición', value: '12', icon: <Target className="w-6 h-6" /> },
    ],
    successStory: {
      title: 'Salud para todos',
      content: 'Gracias a las clínicas móviles, Don José pudo recibir tratamiento para su hipertensión sin tener que viajar largas distancias. Su calidad de vida ha mejorado significativamente.',
      author: 'Don José, Beneficiario',
    },
    objectives: [
      'Facilitar el acceso a clínicas móviles y servicios preventivos.',
      'Promover la seguridad alimentaria mediante huertos comunitarios.',
      'Ofrecer apoyo en salud mental y bienestar emocional.',
      'Organizar campañas de vacunación y prevención de enfermedades.',
    ],
    howToHelp: [
      'Donar suministros médicos básicos.',
      'Apoyar con transporte para pacientes.',
      'Voluntariado profesional en el área de salud.',
    ],
  },
  'espacios-que-transforman': {
    id: 'espacios-que-transforman',
    title: 'Espacios que Transforman',
    description: 'Mejoras en áreas públicas para crear un impacto a largo plazo.',
    fullDescription: 'Los espacios públicos son el corazón de la vida social. Nuestro programa "Espacios que Transforman" revitaliza parques, plazas y centros deportivos, convirtiéndolos en lugares seguros, hermosos y funcionales para el encuentro comunitario. Creemos que un entorno digno fomenta el orgullo y la cohesión social.',
    image: 'https://images.unsplash.com/photo-1559027615-cd26735550b4?q=80&w=2067&auto=format&fit=crop',
    metrics: [
      { label: 'Espacios renovados', value: '8', icon: <Target className="w-6 h-6" /> },
      { label: 'Usuarios diarios', value: '1,500', icon: <Users className="w-6 h-6" /> },
      { label: 'Inversión comunitaria', value: '$2M+', icon: <TrendingUp className="w-6 h-6" /> },
    ],
    successStory: {
      title: 'Un parque para todos',
      content: 'El nuevo parque central de La Ribera se ha convertido en el punto de reunión favorito de las familias. Antes era un terreno baldío, ahora es un oasis de recreación y deporte.',
      author: 'Vecinos de La Ribera',
    },
    objectives: [
      'Renovar parques y áreas de juego infantiles.',
      'Mejorar la iluminación y seguridad en espacios públicos.',
      'Crear murales y expresiones artísticas comunitarias.',
      'Instalar mobiliario urbano sostenible y funcional.',
    ],
    howToHelp: [
      'Donar materiales de construcción o pintura.',
      'Participar en jornadas comunitarias de mantenimiento.',
      'Proponer proyectos de mejora para tu colonia.',
    ],
  },
};

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const program = id ? programData[id] : null;

  if (!program) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-3xl font-bold text-sea mb-4">Programa no encontrado</h2>
        <Link to="/" className="text-coral font-bold hover:underline">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={program.image} 
          alt={program.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/#programas" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver a Programas
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 italic">{program.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              {program.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Left Column: Info */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-16"
              >
                <div>
                  <h2 className="text-3xl font-bold text-sea mb-6">Sobre el Programa</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {program.fullDescription}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-sea mb-8">Objetivos Principales</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {program.objectives.map((obj, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-4 items-start p-6 bg-paper rounded-3xl border border-gray-100"
                      >
                        <CheckCircle2 className="w-6 h-6 text-coral shrink-0" />
                        <p className="text-gray-700 font-medium">{obj}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Success Story */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-sea text-white p-12 rounded-[3rem] relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <Heart className="w-12 h-12 text-coral mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-3xl font-bold mb-6 italic">"{program.successStory.title}"</h3>
                    <p className="text-xl text-white/80 leading-relaxed mb-8 italic">
                      {program.successStory.content}
                    </p>
                    <p className="font-bold text-coral">— {program.successStory.author}</p>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>
                </motion.div>
              </motion.div>

            {/* Right Column: Sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-12"
            >
              {/* Metrics */}
              <div className="bg-paper p-8 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-2xl font-bold text-sea mb-8">Impacto Real</h3>
                <div className="space-y-8">
                  {program.metrics.map((metric, i) => (
                    <motion.div 
                      key={i} 
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
                        <div className="text-sm text-gray-500 uppercase tracking-wider font-bold">{metric.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How to Help */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-coral text-white p-8 rounded-[2.5rem] shadow-xl shadow-coral/20"
              >
                <h3 className="text-2xl font-bold mb-6">¿Cómo puedes ayudar?</h3>
                <ul className="space-y-4 mb-8">
                  {program.howToHelp.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                      <span className="text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/donar" 
                  className="block w-full py-4 bg-white text-coral text-center rounded-full font-bold hover:bg-paper transition-all shadow-lg"
                >
                  Donar ahora
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
