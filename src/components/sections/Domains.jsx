import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Domains = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  const domainsList = [
    { id: 'WEB3', title: 'Decentralized Tech', desc: 'Build the future of trust with blockchain and smart contracts.', icon: '🔗' },
    { id: 'AI_ML', title: 'Machine Intelligence', desc: 'Train models that solve real-world problems autonomously.', icon: '🧠' },
    { id: 'CYBER', title: 'Security & Forensics', desc: 'Secure the grid. Find the flaws before they do.', icon: '🛡️' },
    { id: 'FINTECH', title: 'Financial Systems', desc: 'Revolutionize how value moves across the digital city.', icon: '💸' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="domains" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-carbon/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div ref={headlineRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary"></div>
            <span className="text-primary font-bold tracking-widest text-sm uppercase">Choose Your Sector</span>
            <div className="h-px w-12 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white">
            DOMAINS OF <span className="text-glow text-transparent" style={{WebkitTextStroke: '1px #facc15'}}>CONFLICT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {domainsList.map((domain, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative bg-[#111] border border-white/10 p-8 rounded-sm overflow-hidden hover:border-primary transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(250,204,21,0.1)]"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-zinc-600 group-hover:text-primary/50 transition-colors">
                [SCTOR_{domain.id}]
              </div>
              <div className="text-4xl mb-6 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all">{domain.icon}</div>
              <h3 className="text-2xl font-display font-black text-white mb-3 group-hover:text-primary transition-colors">{domain.title}</h3>
              <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{domain.desc}</p>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Domains;
