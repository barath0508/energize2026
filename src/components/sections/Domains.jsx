import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TrackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" /><path d="m15 9 6-6" />
  </svg>
);

const Domains = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef([]);

  const tracks = [
    { 
      id: 'SOFTWARE', 
      number: '01',
      title: 'The Algorithmic Grid', 
      type: 'Software Track',
      desc: 'Predictive AI & carbon trackers. Build intelligent software solutions for a sustainable future.',
      icon: '💻',
      features: ['Predictive AI Models', 'Carbon Footprint Trackers', 'Gamified Energy Apps', 'Smart Grid Analytics'],
      coordinators: [
        { name: 'Software Coord 1', phone: '+91 0000000000' },
        { name: 'Software Coord 2', phone: '+91 0000000000' }
      ]
    },
    { 
      id: 'HARDWARE', 
      number: '02',
      title: 'The Kinetic Circuit', 
      type: 'Hardware Track',
      desc: 'Energy harvesting, smart meters, & automated load balancing. Engineer circuits that power tomorrow.',
      icon: '⚡',
      features: ['Energy Harvesting', 'Smart Meters', 'Automated Load Balancing', 'IoT Sensors'],
      coordinators: [
        { name: 'Hardware Coord 1', phone: '+91 0000000000' },
        { name: 'Hardware Coord 2', phone: '+91 0000000000' }
      ]
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.domains-header > *', '.domains-desc'], {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out', 
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.fromTo(cardsRef.current,
        { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          opacity: 1, clipPath: 'inset(0% 0 0 0)',
          duration: 0.9, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e, i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(card, {
      rotateX: ((y - centerY) / centerY) * -6,
      rotateY: ((x - centerX) / centerX) * 6,
      x: ((x - centerX) / centerX) * 4,
      y: ((y - centerY) / centerY) * 4,
      duration: 0.4, ease: 'power2.out', transformPerspective: 800,
    });

    const spotlight = card.querySelector('.card-spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,230,118,0.1) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback((i) => {
    const card = cardsRef.current[i];
    if (!card) return;
    gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const spotlight = card.querySelector('.card-spotlight');
    if (spotlight) spotlight.style.background = 'none';
  }, []);

  return (
    <section id="tracks" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-carbon/50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div ref={headlineRef} className="flex flex-col items-center text-center mb-6 domains-header">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <TrackIcon />
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">CHOOSE YOUR TRACK</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            TWO <span className="text-primary">TRACKS</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto text-center domains-desc">Pick your domain — whether you think in code or circuits.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tracks.map((track, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative bg-[#0a1510] border border-white/10 p-8 md:p-10 rounded-lg overflow-hidden hover:border-primary transition-colors duration-300 transform-gpu cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="card-spotlight absolute inset-0 z-0 pointer-events-none rounded-lg"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-6xl">{track.icon}</span>
                  <span className="font-mono text-xs text-zinc-600 group-hover:text-primary/50 transition-colors">[TRACK_{track.id}]</span>
                </div>
                
                <div className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2">{track.type}</div>
                <h3 className="text-2xl md:text-3xl font-display font-black text-white mb-3 group-hover:text-primary transition-colors">{track.title}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors mb-6">{track.desc}</p>
                
                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {track.features.map((feat, j) => (
                    <span key={j} className="px-3 py-1 text-xs font-bold bg-primary/5 border border-primary/20 text-primary/70 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      {feat}
                    </span>
                  ))}
                </div>

                {/* Coordinators Info */}
                <div className="pt-4 border-t border-white/5 flex flex-col gap-2 group-hover:border-primary/20 transition-colors relative z-20">
                  <p className="text-[10px] text-zinc-500 font-bold tracking-wider uppercase mb-1">Track Coordinators</p>
                  <div className="flex flex-col gap-2">
                    {track.coordinators.map((coord, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <p className="text-sm text-zinc-200 font-medium group-hover:text-primary transition-colors">{coord.name}</p>
                        <a 
                          href={`tel:${coord.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-primary/10 border border-transparent hover:border-primary/30 text-[11px] font-semibold tracking-wide text-zinc-300 hover:text-primary transition-all"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          {coord.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Domains;
