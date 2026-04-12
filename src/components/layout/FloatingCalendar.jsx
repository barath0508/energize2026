import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
  </svg>
);

const FloatingMap = () => {
  return (
    <>
      {/* Floating WhatsApp Icon */}
      <motion.a
        href="https://wa.me/?text=%F0%9F%9A%80%20Hey%20guys!%20RIT%20is%20hosting%20ENERGIZE%202026%E2%80%94a%20massive%20on-spot%20Hardware%20%26%20Software%20Hackathon%20on%20April%2021st!%20Great%20networking,%20cash%20prizes,%20and%20it's%20a%20great%20resume%20booster.%20Check%20it%20out%20and%20register%20fast,%20slots%20are%20filling%20up:%20https://energize2026.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.5, type: 'spring' }}
        className="fixed bottom-[10.5rem] right-6 z-50 flex items-center group cursor-pointer"
      >
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-carbon border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none group-hover:-translate-x-2 duration-300">
          <p className="text-sm font-bold text-primary">Invite your Team</p>
          <p className="text-xs text-zinc-400">Share via WhatsApp</p>
        </div>

        <div className="w-14 h-14 bg-background border border-primary text-primary rounded-full flex items-center justify-center relative hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
          <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
          <WhatsAppIcon size={24} />
        </div>
      </motion.a>

      {/* Floating Instagram Icon */}
      <motion.a
        href="https://www.instagram.com/rit_iete_official/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: 'spring' }}
        className="fixed bottom-24 right-6 z-50 flex items-center group cursor-pointer"
      >
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-carbon border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none group-hover:-translate-x-2 duration-300">
          <p className="text-sm font-bold text-primary">Follow Us</p>
          <p className="text-xs text-zinc-400">@iete_rit on Instagram</p>
        </div>

        <div className="w-14 h-14 bg-background border border-primary text-primary rounded-full flex items-center justify-center relative hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
          <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
          <InstagramIcon size={24} />
        </div>
      </motion.a>

      {/* Floating Map Icon */}
      <motion.a 
        href="https://maps.app.goo.gl/oo5ZG5zUYGit4Qzo8"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 flex items-center group cursor-pointer"
      >
        {/* Tooltip */}
        <div className="absolute right-full mr-4 bg-carbon border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none group-hover:-translate-x-2 duration-300">
          <p className="text-sm font-bold text-primary">View Venue</p>
          <p className="text-xs text-zinc-400">Green Building, 4th Floor, RIT</p>
        </div>
        
        <div className="w-14 h-14 bg-background border border-primary text-primary rounded-full flex items-center justify-center border-glow relative hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,230,118,0.2)]">
          <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
          <MapPin size={24} />
        </div>
      </motion.a>
    </>
  );
};

export default FloatingMap;
