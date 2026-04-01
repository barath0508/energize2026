import React from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingMap = () => {
  return (
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
  );
};

export default FloatingMap;
