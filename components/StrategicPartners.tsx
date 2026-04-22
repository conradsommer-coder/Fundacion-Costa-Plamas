import React from 'react';

const strategicPartners = [
  { name: 'Costa Palmas', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1774050649/1.-costa-palmas_rk5gae.png' },
  { name: 'Socio 2', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776296280/WhatsApp_Image_2026-01-29_at_12.26.33_PM_zu20uq.jpg' },
  { name: 'Socio 3', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776816294/Screenshot_2026-04-21_at_5.04.34_p.m._qr4bla.png' },
  { name: 'CP Golf', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292691/CP_Golf_-_Bronze-01_nsngby.png' },
  { name: 'Mozza', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292712/MOZZA_LOGO__page-0001_af31ah.jpg' },
  { name: 'LCB Resort', logo: 'https://res.cloudinary.com/dr78wne7t/image/upload/v1776292702/LCB_Resort_and_Res_White_BOX_TGE_rxownf.png' },
];

const StrategicPartners: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
      {strategicPartners.map((partner, index) => (
        <div 
          key={index} 
          className="h-32 w-full max-w-[180px] flex items-center justify-center p-6 bg-white rounded-2xl shadow-md border border-gray-50 transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
        >
          <img 
            src={partner.logo} 
            alt={partner.name} 
            className="max-h-full max-w-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}
    </div>
  );
};

export default StrategicPartners;
