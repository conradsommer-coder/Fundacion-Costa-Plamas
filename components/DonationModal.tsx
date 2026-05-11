
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

  const usBankInfo = {
    banco: 'US Bank',
    titular: 'International Community Foundation',
    routing: '122235821',
    cuenta: '158300255946',
    swift: 'USBKUS44IMT',
    direccion: '4747 Executive Dr Ste 300, San Diego, CA 92121',
    referencia: 'Fundación Costa Palmas'
  };

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
              className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Mexico Bank Info */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 bg-white border-r border-gray-100 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center text-coral">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-serif text-sea leading-tight">Donativos en México</h2>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed font-light text-sm">
                  Deducibles de impuestos al realizar una transferencia bancaria a la siguiente cuenta:
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

                  <div className="space-y-6 pt-4 border-t border-gray-200/50">
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Cuenta en Pesos</label>
                      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-sea font-mono font-bold text-lg tracking-tight">{bankInfo.cuenta}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(bankInfo.cuenta, 'cuenta'); }}
                          className="w-8 h-8 bg-coral/5 text-coral rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-all shadow-sm"
                        >
                          {copiedField === 'cuenta' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-1">CLABE INTERBANCARIA</label>
                      <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-sea font-mono font-bold text-lg tracking-tight">{bankInfo.clabe}</p>
                        <button 
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(bankInfo.clabe, 'clabe'); }}
                          className="w-8 h-8 bg-coral/5 text-coral rounded-lg flex items-center justify-center hover:bg-coral hover:text-white transition-all shadow-sm"
                        >
                          {copiedField === 'clabe' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 rounded-2xl bg-sea/5 border border-sea/10 flex items-center gap-4">
                  <Mail className="w-6 h-6 text-sea" />
                  <div className="text-xs">
                    <p className="font-bold text-sea mb-1">¿Requieres un recibo deducible?</p>
                    <a href="mailto:fundacion@costapalmas.com" className="text-coral font-bold underline">
                      fundacion@costapalmas.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side: USA Bank Info (ICF) */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 bg-paper overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center text-coral">
                    <ExternalLink className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-serif text-sea leading-tight">Donativos en USA (ICF)</h2>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed font-light text-sm">
                  Las donaciones realizadas desde Estados Unidos son elegibles para un recibo deducible de impuestos a través de ICF.
                </p>

                <div className="space-y-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                   <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Banco</label>
                      <p className="text-sea font-bold text-sm">{usBankInfo.banco}</p>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">SWIFT</label>
                      <p className="text-sea font-bold text-sm">{usBankInfo.swift}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Titular</label>
                    <p className="text-sea font-bold text-sm">{usBankInfo.titular}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Número de Ruta</label>
                      <div className="flex items-center justify-between gap-2 bg-paper p-2 rounded-lg border border-gray-100">
                        <p className="text-sea font-mono font-bold text-xs">{usBankInfo.routing}</p>
                        <button 
                          onClick={() => copyToClipboard(usBankInfo.routing, 'routing_us')}
                          className="text-coral hover:scale-110 transition-transform"
                        >
                          {copiedField === 'routing_us' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                     <div className="relative group">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Número de Cuenta</label>
                      <div className="flex items-center justify-between gap-2 bg-paper p-2 rounded-lg border border-gray-100">
                        <p className="text-sea font-mono font-bold text-xs">{usBankInfo.cuenta}</p>
                        <button 
                          onClick={() => copyToClipboard(usBankInfo.cuenta, 'cuenta_us')}
                          className="text-coral hover:scale-110 transition-transform"
                        >
                          {copiedField === 'cuenta_us' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Referencia</label>
                    <p className="text-sea font-bold text-sm italic">{usBankInfo.referencia}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-gray-400 block mb-1">Dirección del Banco</label>
                    <p className="text-gray-500 text-[10px] leading-tight">{usBankInfo.direccion}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="p-4 rounded-xl bg-white border border-gray-100 text-[11px] text-gray-600 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-sea" />
                    </div>
                    <div>
                      <p className="font-bold text-sea mb-1">Enviar un cheque por correo</p>
                      <p>A nombre de: <span className="font-bold">International Community Foundation</span></p>
                      <p>Dirección: <span className="font-bold">2505 N Avenue, National City, CA 91950</span></p>
                      <p>Memo: <span className="italic">Fundación Costa Palmas</span></p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-gray-100 text-[11px] text-gray-600 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-sea" />
                    </div>
                    <p>Confirmar transacción: <span className="font-bold text-sea">info@icfdn.org</span></p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-gray-100 text-[11px] text-gray-600 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-paper flex items-center justify-center shrink-0">
                      <ExternalLink className="w-4 h-4 text-sea" />
                    </div>
                    <p>Donar un legado (Freewill): <a href="https://www.freewill.com/icf" target="_blank" rel="noopener noreferrer" className="font-bold text-sea underline">Saber más</a></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DonationModal;
