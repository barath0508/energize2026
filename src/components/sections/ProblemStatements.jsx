import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import hardwarePdf from '../../assets/Hardware Problem Statements.pdf';

gsap.registerPlugin(ScrollTrigger);

const ProblemIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

const ProblemStatements = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const statements = [
    {
      id: 'SOFTWARE',
      title: 'Software Problem Statements',
      type: 'Track 01',
      desc: 'Problem statements will be given on-spot for this track. Build intelligent software solutions for a sustainable future.',
      status: 'none',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <path d="m8 21 4-4 4 4"/><path d="M8 21h8"/>
          <path d="m10 9 2 2 4-4"/>
        </svg>
      ),
    },
    {
      id: 'HARDWARE',
      title: 'Hardware Problem Statements',
      type: 'Track 02',
      desc: 'You can choose any problem statement under the theme of Smart Energy. Build the physical solutions of the future.',
      status: 'none',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.problems-header .p-3', {
        opacity: 0, y: -30, scale: 0.5,
        duration: 1, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.fromTo('.problems-header h2',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -60 },
        { 
          clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, 
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.from('.problems-desc', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="problem-statements" ref={sectionRef} className="py-16 md:py-32 relative z-10 border-t border-white/5 bg-black/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-6 problems-header">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <ProblemIcon />
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">THE CHALLENGES</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase">
            PROBLEM <span className="text-primary">STATEMENTS</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto text-center problems-desc">
          Pushing the boundaries of innovation. Explore the challenges you will conquer during the hackathon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {statements.map((stmt, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative bg-[#0a1510]/80 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 flex flex-col items-center text-center min-h-[320px] justify-center"
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{stmt.icon}</div>
                
                <div className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-3">{stmt.type}</div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{stmt.title}</h3>
                <p className="text-zinc-400 text-sm max-w-sm mb-8">{stmt.desc}</p>
                
                  {/* Status buttons removed as per Open Innovation instructions */}
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700 ease-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatements;
