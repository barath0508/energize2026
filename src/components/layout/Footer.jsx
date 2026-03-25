import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA content scroll reveal
      gsap.from('.footer-cta', {
        opacity: 0, y: 60, scale: 0.95,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
      });

      gsap.from('.footer-cta-desc', {
        opacity: 0, y: 30,
        duration: 0.8, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
      });

      gsap.from('.footer-cta-btn', {
        opacity: 0, scale: 0, y: 20,
        duration: 0.6, delay: 0.4, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
      });

      // Bottom bar
      gsap.from('.footer-bottom', {
        opacity: 0, y: 20,
        duration: 0.6, delay: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 border-t border-white/10 bg-black pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="footer-cta text-4xl md:text-6xl font-display font-black tracking-tighter mb-4 text-primary animate-glow-pulse">
          BECOME THE KNIGHT
        </h2>
        <p className="footer-cta-desc text-zinc-400 mb-8 max-w-lg mx-auto">
          Join the ultimate 24-hour hackathon to craft solutions that stand against the darkness.
        </p>
        
        <button className="footer-cta-btn px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wider mb-16 hover:shadow-[0_0_40px_rgba(250,204,21,0.4)] hover:-translate-y-1 duration-300">
          Register Now
        </button>

        <div className="footer-bottom flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-zinc-500 gap-4">
          <div className="flex items-center gap-2 font-display font-black text-lg text-white">
            <span className="text-primary">HACK</span>HUSTLE
          </div>
          <p>© 2026 Hack Hustle. All rights reserved.</p>
          <div className="flex gap-4">
            {['Twitter', 'Discord', 'Instagram'].map(name => (
              <a 
                key={name} 
                href="#" 
                className="hover:text-primary transition-colors relative group"
              >
                {name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
