import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
      gsap.from(statsRef.current, {
        opacity: 0, scale: 0.9, y: 20, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary"></div>
              <span className="text-primary font-bold tracking-widest text-sm uppercase">The Mission</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-8 text-white">
              IT'S NOT JUST A <br /> 
              <span className="text-primary border-b-4 border-primary">HACKATHON.</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              We live in a world where technology shapes reality. But true innovation requires more than just knowing how to code—it requires the courage to build something that matters, something that stands against the ordinary.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Hack Hustle Code Knight is a 24-hour immersive experience. Assemble your team, choose your domain, and engineer solutions that pierce through the darkness. The city needs a hero. Will it be you?
            </p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[ { value: '24', label: 'Hours' }, { value: '5+', label: 'Domains' }, { value: '$10k+', label: 'Prizes' }, { value: '500+', label: 'Hackers' } ].map((stat, i) => (
                <div 
                  key={i} 
                  ref={el => statsRef.current[i] = el}
                  className="bg-carbon border border-white/5 p-8 rounded-lg text-center hover:border-primary/50 transition-colors group"
                >
                  <div className="text-4xl md:text-5xl font-display font-black text-white group-hover:text-primary transition-colors group-hover:text-glow mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
