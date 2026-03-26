
import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Programas', href: '/programas' },
    { name: 'Historias', href: '/historias' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={scrolled || !isHome 
              ? "https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png" 
              : "https://res.cloudinary.com/dr78wne7t/image/upload/v1774037190/ChatGPT_Image_Mar_10_2026_07_50_31_PM_d3ympz.png"
            } 
            alt="Fundación Costa Palmas Logo" 
            className="h-12 md:h-24 w-auto object-contain transition-all duration-300"
            referrerPolicy="no-referrer"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            const isExternal = link.href.startsWith('http');
            
            return (
              <div key={link.name} className="relative group">
                {isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-bold transition-colors py-2 ${
                      scrolled || !isHome 
                        ? 'text-sea/70 hover:text-sea' 
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-bold transition-colors py-2 flex flex-col items-center ${
                      isActive
                        ? (scrolled || !isHome ? 'text-sea' : 'text-white')
                        : (scrolled || !isHome ? 'text-sea/60 hover:text-sea' : 'text-white/60 hover:text-white')
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${
                          scrolled || !isHome ? 'bg-coral' : 'bg-white'
                        }`}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {!isActive && (
                      <div className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ${
                        scrolled || !isHome ? 'bg-coral/40' : 'bg-white/40'
                      }`} />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
          
          <div className="flex items-center gap-6 pl-4 border-l border-gray-300/30">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/donar"
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md ${
                  scrolled || !isHome
                    ? 'bg-coral text-white hover:brightness-110' 
                    : 'bg-white text-sea hover:bg-coral hover:text-white'
                }`}
              >
                Donar
              </Link>
            </motion.div>
            
            <button className={`flex items-center gap-1 text-xs font-bold transition-opacity hover:opacity-70 ${scrolled || !isHome ? 'text-gray-500' : 'text-white/80'}`}>
              <Globe className="w-4 h-4" />
              <span>ES | EN</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={`w-8 h-8 ${scrolled || !isHome ? 'text-sea' : 'text-white'}`} />
          ) : (
            <Menu className={`w-8 h-8 ${scrolled || !isHome ? 'text-sea' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-white border-t p-8 shadow-2xl"
        >
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-2xl font-serif transition-colors ${
                    isActive ? 'text-coral' : 'text-sea hover:text-coral'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {isActive && <span className="ml-2 text-coral">•</span>}
                </Link>
              );
            })}
            <Link
              to="/donar"
              className="bg-coral text-white text-center py-4 rounded-full font-bold text-lg shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Donar
            </Link>
            <div className="flex justify-center pt-4">
              <button className="flex items-center gap-2 text-gray-500 font-bold">
                <Globe className="w-5 h-5" />
                <span>ES | EN</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
