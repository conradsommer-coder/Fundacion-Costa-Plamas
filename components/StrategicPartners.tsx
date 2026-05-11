import React from 'react';

interface Partner {
  name: string;
  logo: string | null;
}

interface StrategicPartnersProps {
  type?: 'community' | 'allies';
}

const communityLogos: Partner[] = [
  { name: 'Costa Palmas', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050649/1.-costa-palmas_rk5gae.png' },
  { name: 'Delphine', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776296280/WhatsApp_Image_2026-01-29_at_12.26.33_PM_zu20uq.jpg' },
  { name: 'Aventura', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776816294/Screenshot_2026-04-21_at_5.04.34_p.m._qr4bla.png' },
  { name: 'Costa Palmas Golf Club', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292691/CP_Golf_-_Bronze-01_nsngby.png' },
  { name: 'Mozza', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292712/MOZZA_LOGO__page-0001_af31ah.jpg' },
  { name: 'Four Seasons Resort and Residences Los Cabos at Costa Palmas', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292702/LCB_Resort_and_Res_White_BOX_TGE_rxownf.png' },
];

const tier1: Partner[] = [
  { name: 'Baja Legal Group', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778205185/Logo-Primario-Azul-Naranja_vd46pb.png' },
  { name: 'Hardy Carts & Equipment', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195702/WhatsApp_Image_2026-01-26_at_12.00.23_PM_yyvg9i.jpg' },
  { name: 'Donato Stone Wood Tech', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Logo_azul_con_slogan_mo5cpl.png' },
];

const tier2: Partner[] = [
  { name: 'Innovación Solar', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778205259/WhatsApp_Image_2026-02-17_at_4.17.12_PM_rv29k9.jpg' },
  { name: 'Hermosillo', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195689/Hermosillo-All-Logos-RGB-01_vwsxm4.png' },
];

const tier3: Partner[] = [
  { name: 'Global Escrow', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Logo_azul_con_slogan_mo5cpl.png' },
  { name: 'DGU', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Logo_DGU_ebycgv.jpg' },
  { name: 'DUES', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195698/Logo_DUES_uxvi3e.png' },
  { name: 'Equipamiento Hotelero', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195690/equipamiento_ovomyv.png' },
];

const tier4: Partner[] = [
  { name: 'Pro Logo', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195699/Pro_Logo_DEEPER_BEIGE_ip1fcb.png' },
  { name: 'Encore', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195693/Imagen1_bbm3er.png' },
  { name: 'VVR Pro', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195698/logo_naranja_cxhean.png' },
  { name: 'Hardy Carts & Equipment', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1778195700/WhatsApp_Image_2026-01-21_at_12.22.28_PM_kxyl6p.jpg' },
];

const PartnerCard: React.FC<{ partner: Partner; size?: 'lg' | 'md' | 'sm' }> = ({ partner, size = 'md' }) => {
  const heightClasses = {
    lg: 'h-40 p-10',
    md: 'h-32 p-8',
    sm: 'h-24 p-6',
  };

  return (
    <div className={`${heightClasses[size]} w-full flex items-center justify-center bg-white rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 group`}>
      {partner.logo ? (
        <img 
          src={partner.logo} 
          alt={partner.name} 
          className="max-h-full max-w-full object-contain transition-all duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `<span class="text-[10px] font-bold text-gray-400 text-center px-2 uppercase tracking-tight">${partner.name}</span>`;
          }}
        />
      ) : (
        <span className="text-[10px] font-bold text-gray-300 text-center px-2 uppercase tracking-tight">{partner.name}</span>
      )}
    </div>
  );
};

const StrategicPartners: React.FC<StrategicPartnersProps> = ({ type = 'community' }) => {
  if (type === 'community') {
    return (
      <div className="space-y-12">
        {/* Main Logo */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-sm">
            <PartnerCard partner={communityLogos[0]} size="lg" />
          </div>
        </div>
        
        {/* Business Units */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {communityLogos.slice(1).map((partner, index) => (
            <PartnerCard key={index} partner={partner} size="md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Fila 1 */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tier1.map((partner, index) => (
            <PartnerCard key={index} partner={partner} size="lg" />
          ))}
        </div>
      </div>

      {/* Fila 2 */}
      <div>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tier2.map((partner, index) => (
            <PartnerCard key={index} partner={partner} size="lg" />
          ))}
        </div>
      </div>

      {/* Fila 3 */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {tier3.map((partner, index) => (
            <PartnerCard key={index} partner={partner} size="md" />
          ))}
        </div>
      </div>

      {/* Fila 4 */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {tier4.map((partner, index) => (
            <PartnerCard key={index} partner={partner} size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategicPartners;
