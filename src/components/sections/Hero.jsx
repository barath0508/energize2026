import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge float in
      gsap.from('.hero-badge', {
        opacity: 0, y: -30, scale: 0.8,
        duration: 1, delay: 0.2, ease: 'elastic.out(1, 0.5)'
      });
      
      // Continuous badge float
      gsap.to('.hero-badge', {
        y: -5, rotation: 0.5,
        duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2
      });

      // Title line 1 — clip & slide reveal
      gsap.fromTo('.hero-title-1', 
        { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -60 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, duration: 1.2, delay: 0.4, ease: 'power4.out' }
      );

      // Title line 2 — clip & slide reveal (opposite direction)
      gsap.fromTo('.hero-title-2',
        { clipPath: 'inset(0 0 0 100%)', opacity: 0, x: 60 },
        { clipPath: 'inset(0 0 0 0%)', opacity: 1, x: 0, duration: 1.2, delay: 0.7, ease: 'power4.out' }
      );

      // Glitch flicker after text reveals
      const glitchTl = gsap.timeline({ delay: 2.5, repeat: -1, repeatDelay: 5 });
      glitchTl
        .to('.hero-glitch-overlay', { opacity: 0.8, duration: 0.05 })
        .to('.hero-glitch-overlay', { opacity: 0, duration: 0.05 })
        .to('.hero-glitch-overlay', { opacity: 0.6, duration: 0.03 })
        .to('.hero-glitch-overlay', { opacity: 0, duration: 0.08 })
        .to('.hero-glitch-overlay', { x: -3, duration: 0.05 })
        .to('.hero-glitch-overlay', { x: 3, duration: 0.05 })
        .to('.hero-glitch-overlay', { x: 0, opacity: 0, duration: 0.05 });

      // Description fade
      gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 1, delay: 1.2, ease: 'power3.out' });

      // Button elastic entrance
      gsap.from('.hero-btn', {
        opacity: 0, scale: 0, y: 40,
        duration: 0.8, delay: 1.5, stagger: 0.2,
        ease: 'elastic.out(1, 0.5)'
      });

      // Background slow drift
      gsap.to('.hero-bg-img', {
        scale: 1.08, duration: 12, ease: 'none', repeat: -1, yoyo: true
      });

      // Parallax on scroll
      gsap.to('.hero-bg-img', {
        y: 150, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Content parallax (moves up slower)
      gsap.to('.hero-content', {
        y: -50, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

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
      
      <div className="hero-content container mx-auto text-center relative z-20">
        <div className="hero-badge inline-block mb-6 px-4 py-1 border border-primary/30 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest backdrop-blur-md">
          OCT 24-25, 2026 • 24 HOURS
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter text-white leading-none mb-6 relative overflow-hidden">
          <span className="hero-title-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-300 block">
            CODE
          </span>
          <span className="hero-title-2 text-primary block -mt-4">
            KNIGHT
          </span>
          {/* Glitch overlay clone */}
          <span className="hero-glitch-overlay absolute inset-0 text-6xl md:text-8xl lg:text-[10rem] font-display font-black tracking-tighter opacity-0 pointer-events-none flex flex-col items-center justify-center" aria-hidden="true"
            style={{ mixBlendMode: 'screen', clipPath: 'inset(10% 0 60% 0)' }}
          >
            <span className="block text-cyan-400">CODE</span>
            <span className="block text-red-500 -mt-4">KNIGHT</span>
          </span>
        </h1>
        
        <p className="hero-desc text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium">
          Step into the shadows. Illuminate the code. An epic 24-hour hackathon where innovation meets competition.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wider hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 duration-300">
            Register for the Hunt
          </button>
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all rounded-sm active:scale-95 uppercase tracking-wider hover:border-primary/50 hover:-translate-y-0.5 duration-300">
            View Domains
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
