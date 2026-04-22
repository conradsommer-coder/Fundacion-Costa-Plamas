
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Mail, Copy, Check, ZoomIn } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

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

  const donationImageUrl = "https://res.cloudinary.com/dr78wne7t/image/upload/v1776835087/FCP_FORMAS_PARA_DONAR_page-0001_xfmomc.jpg";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-sea/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto md:overflow-hidden rounded-[2rem] shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Image (The requested lightbox image) */}
              <div 
                className="w-full md:w-1/2 bg-paper p-6 flex flex-col items-center justify-center cursor-zoom-in group"
                onClick={() => setIsZoomed(true)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white p-2">
                  <img 
                    src={donationImageUrl}
                    alt="Formas para donar"
                    className="w-full h-auto object-contain max-h-[50vh] md:max-h-[70vh]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white/90 p-3 rounded-full shadow-lg">
                      <ZoomIn className="w-6 h-6 text-sea" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 group-hover:text-sea transition-colors">
                  Haz clic para ampliar imagen
                </p>
              </div>

              {/* Right Side: Bank Info */}
              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white border-l border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center text-coral">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-serif text-sea leading-tight">Donativos Deducibles en México</h2>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed font-light">
                  Los donantes mexicanos pueden recibir un recibo deducible de impuestos al realizar una transferencia bancaria a la siguiente cuenta:
                </p>

                <div className="space-y-6 bg-paper p-8 rounded-[2rem] border border-gray-100 shadow-inner">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Titular</label>
                    <p className="text-sea font-bold text-lg">{bankInfo.titular}</p>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Banco</label>
                    <p className="text-sea font-bold text-lg">{bankInfo.banco}</p>
                  </div>

                  {/* Redesigned to give numbers more space */}
                  <div className="space-y-6 pt-4 border-t border-gray-200/50">
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Cuenta en Pesos</label>
                      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-sea font-mono font-bold text-xl tracking-tight">{bankInfo.cuenta}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(bankInfo.cuenta, 'cuenta'); }}
                          className="w-10 h-10 bg-coral/5 text-coral rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-all shadow-sm"
                        >
                          {copiedField === 'cuenta' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">CLABE INTERBANCARIA</label>
                      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-sea font-mono font-bold text-xl tracking-tight">{bankInfo.clabe}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(bankInfo.clabe, 'clabe'); }}
                          className="w-10 h-10 bg-coral/5 text-coral rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-all shadow-sm"
                        >
                          {copiedField === 'clabe' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-sea text-white flex items-center gap-4 shadow-xl">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold mb-1 opacity-90">¿Requieres un recibo deducible?</p>
                    <p className="font-light mb-1">Envía un correo a:</p>
                    <a href="mailto:fundacion@costapalmas.com" className="font-bold underline decoration-coral decoration-2 underline-offset-4 hover:text-coral transition-colors">
                      fundacion@costapalmas.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Zoom */}
      <AnimatePresence>
        {isZoomed && (
          <div className="fixed inset-0 z-[110] overflow-y-auto bg-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 cursor-zoom-out"
            />
            
            <div className="min-h-screen flex items-start justify-center p-4 md:p-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative z-10 max-w-5xl w-full flex flex-col items-center"
              >
                <div className="sticky top-4 md:top-8 w-full flex justify-end mb-4 z-20">
                  <button 
                    onClick={() => setIsZoomed(false)}
                    className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white flex items-center gap-2 font-bold hover:bg-coral transition-all shadow-lg"
                  >
                    <span>Cerrar</span>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <img 
                  src={donationImageUrl}
                  alt="Formas para donar ampliado"
                  className="w-full h-auto rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationModal;
