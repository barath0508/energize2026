import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroBg from '../../assets/hero.png';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2, ease: 'power2.out' });
      gsap.from('.hero-title-1', { opacity: 0, x: -50, duration: 1, delay: 0.4, ease: 'power3.out' });
      gsap.from('.hero-title-2', { opacity: 0, x: 50, duration: 1, delay: 0.6, ease: 'power3.out' });
      gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 1, ease: 'power2.out' });
      gsap.from('.hero-btn', { opacity: 0, y: 30, duration: 0.6, delay: 1.2, stagger: 0.2, ease: 'power2.out' });
      gsap.to('.hero-bg-img', { scale: 1.05, duration: 10, ease: 'none', repeat: -1, yoyo: true });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="min-h-screen relative flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Image Asset */}
      <div 
        className="hero-bg-img absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 pointer-events-none"></div>
      
      <div className="container mx-auto text-center relative z-20">
        <div className="hero-badge inline-block mb-6 px-4 py-1 border border-primary/30 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest backdrop-blur-md">
          OCT 24-25, 2026 • 24 HOURS
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter text-white leading-none mb-6 text-glow relative overflow-hidden">
          <span className="hero-title-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 block">CODE</span>
          <span className="hero-title-2 text-primary block -mt-4">KNIGHT</span>
        </h1>
        
        <p className="hero-desc text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium">
          Step into the shadows. Illuminate the code. An epic 24-hour hackathon where innovation meets competition.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wider">
            Register for the Hunt
          </button>
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all rounded-sm active:scale-95 uppercase tracking-wider backdrop-blur-md">
            View Domains
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
