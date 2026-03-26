
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-20 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <img 
              src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png" 
              alt="Fundación Costa Palmas Logo" 
              className="h-16 w-auto object-contain mb-8"
              referrerPolicy="no-referrer"
            />
            <p className="text-gray-500 leading-relaxed mb-8">
              Impulsando el desarrollo sostenible y el bienestar de las comunidades en Cabo del Este, Baja California Sur.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-paper flex items-center justify-center text-sea hover:bg-sea hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sea font-bold text-lg mb-8">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-gray-600">
              <li><Link to="/" className="hover:text-sea transition-colors">Inicio</Link></li>
              <li><Link to="/nosotros" className="hover:text-sea transition-colors">Nosotros</Link></li>
              <li><Link to="/programas" className="hover:text-sea transition-colors">Programas</Link></li>
              <li><Link to="/contacto" className="hover:text-sea transition-colors">Contacto</Link></li>
              <li><Link to="/contacto" className="hover:text-sea transition-colors">Voluntariado</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sea font-bold text-lg mb-8">Contacto</h4>
            <ul className="space-y-6 text-gray-600">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-coral shrink-0" />
                <span>Cabo del Este, Baja California Sur, México.</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-coral shrink-0" />
                <a href="mailto:info@fundacioncostapalmas.org" className="hover:text-sea transition-colors">
                  info@fundacioncostapalmas.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sea font-bold text-lg mb-8">Boletín</h4>
            <p className="text-gray-500 mb-6">Suscríbete para recibir noticias y actualizaciones de nuestro impacto.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Tu correo electrónico"
                className="bg-paper border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-sea/20 w-full"
              />
              <button className="bg-sea text-white px-6 py-4 rounded-2xl font-bold hover:bg-opacity-90 transition-all">
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
          <div>&copy; {new Date().getFullYear()} Fundación Costa Palmas. Todos los derechos reservados.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-sea transition-colors">Aviso de Privacidad</a>
            <a href="#" className="hover:text-sea transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
