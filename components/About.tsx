
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const About: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("User interaction required for unmuted playback", err));
        // Unmute when explicitly playing if it was muted
        if (isMuted) {
          videoRef.current.muted = false;
          setIsMuted(false);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img 
            src="https://res.cloudinary.com/dr78wne7t/image/upload/v1774037289/3_hokb0j.png" 
            alt="Fundación Costa Palmas Logo" 
            className="h-20 w-auto object-contain mb-6"
            referrerPolicy="no-referrer"
          />
          <h2 className="text-4xl md:text-5xl text-sea mb-8">¿Quiénes Somos?</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-10">
            <p>
              Fundación Costa Palmas es una organización sin fines de lucro dedicada a impulsar el desarrollo sostenible en la región de Cabo del Este, Baja California Sur.
            </p>
            <p>
              Nacimos con la convicción de que el crecimiento de una región debe ir de la mano con el bienestar de su gente y la protección de su entorno natural. Trabajamos en estrecha colaboración con las comunidades locales para identificar necesidades y co-crear soluciones que generen un impacto positivo y duradero.
            </p>
          </div>
          <Link 
            to="/nosotros" 
            className="inline-block px-10 py-4 bg-sea text-white rounded-full font-bold hover:bg-sea/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Conoce más sobre nosotros
          </Link>
        </div>
        
        <div className="order-1 lg:order-2 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dr78wne7t/image/upload/v1776292703/DSC01348_vfhuwm.jpg" 
              alt="Comunidad local" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-coral/20 rounded-full -z-10"></div>
          <div className="absolute -top-6 -right-6 w-48 h-48 bg-sea/10 rounded-full -z-10"></div>
        </div>
      </div>

      <div className="mt-20 rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[21/9] bg-sea/5 relative group cursor-pointer" onClick={togglePlay}>
        <video 
          ref={videoRef}
          src="https://res.cloudinary.com/dr78wne7t/video/upload/v1776840434/fundacion_costa_palmas_v2_compressed_pn4nhr.mp4" 
          autoPlay 
          loop 
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Overlay showing play button when paused or on hover */}
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 flex items-center justify-center ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
          <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sea shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </div>
        </div>

        {/* Mute toggle button */}
        <button 
          onClick={toggleMute}
          className="absolute bottom-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all z-20"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};

export default About;
