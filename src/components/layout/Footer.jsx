import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 text-glow text-primary">
          BECOME THE KNIGHT
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
          Join the ultimate 24-hour hackathon to craft solutions that stand against the darkness.
        </p>
        
        <button className="px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wider mb-16">
          Register Now
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-zinc-500 gap-4">
          <div className="flex items-center gap-2 font-display font-black text-lg text-white">
            <span className="text-primary">HACK</span>HUSTLE
          </div>
          <p>© 2026 Hack Hustle. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">Discord</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
