import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SponsorsSection = () => {
  const sectionRef = useRef(null);
  const logosRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logosRef.current, {
        opacity: 0, 
        scale: 0.8, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'back.out(2)',
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 80%' 
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sponsors" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white mb-16">
          BACKED BY <span className="text-primary text-glow">THE BEST</span>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 mix-blend-luminosity">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              ref={el => logosRef.current[i] = el} 
              className="h-16 w-36 bg-carbon border border-white/10 rounded-sm hover:opacity-100 hover:mix-blend-normal hover:bg-[#111] hover:border-primary/50 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all flex items-center justify-center group cursor-pointer"
            >
              <span className="font-mono text-zinc-500 text-sm font-bold uppercase tracking-widest group-hover:text-primary transition-colors">Sponsor {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
