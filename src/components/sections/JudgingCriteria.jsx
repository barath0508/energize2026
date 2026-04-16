import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CriteriaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const JudgingCriteria = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const criteria = [
    {
      title: 'Innovation & Idea Impact',
      emoji: '💡',
      desc: 'Originality and creativity of the concept, problem-solving relevance, and real-world impact.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/>
          <path d="M9 18h6"/><path d="M10 22h4"/>
        </svg>
      )
    },
    {
      title: 'Prototype & Execution',
      emoji: '🛠️',
      desc: 'Core functionality demonstration, technical approach feasibility, and clarity of the solution.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    },
    {
      title: 'Scalability & Future Potential',
      emoji: '📈',
      desc: 'Scope for expansion, adaptability to larger markets, and long-term sustainability.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M22 12A10 10 0 1 1 12 2"/>
          <path d="M22 2v6h-6"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="m22 2-10.1 10.1"/>
        </svg>
      )
    },
    {
      title: 'Development & Market Strategy',
      emoji: '🚀',
      desc: '3-Month roadmap, resource planning, and go-to-market strategy with full funding.',
      highlight: '“If provided full funding, how would you develop your idea and launch it within 3 months?”',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      )
    },
    {
      title: 'Presentation & Pitch',
      emoji: '🎤',
      desc: 'Clarity, confidence, storytelling, and ability to handle the Q&A session effectively.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
          <line x1="8" y1="22" x2="16" y2="22"/>
        </svg>
      )
    },
    {
      title: 'Team Collaboration',
      emoji: '👥',
      desc: 'Coordination between members, equal contribution, and clear role definition.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.judging-header .p-3', {
        opacity: 0, y: -30, scale: 0.5,
        duration: 1, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.fromTo('.judging-header h2',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -60 },
        { 
          clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, 
          duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      gsap.from('.judging-desc', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="judging-criteria" ref={sectionRef} className="py-16 md:py-32 relative z-10 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-6 judging-header">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <CriteriaIcon />
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">EVALUATION</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase">
            JUDGING <span className="text-primary">CRITERIA</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-2xl mx-auto text-center judging-desc text-lg leading-relaxed">
          Your prototype may be simple — but your idea should speak volumes. We evaluate vision, clarity, and impact across these core pillars.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((item, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="group relative bg-carbon/50 backdrop-blur-sm border border-white/5 p-8 rounded-xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6 p-4 w-fit rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-primary/30 transition-all duration-500">
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-lg opacity-80">{item.emoji}</span> {item.title}
                </h3>
                
                <p className="text-zinc-400 text-sm leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors">
                  {item.desc}
                </p>

                {item.highlight && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/10 border-l-2 border-primary">
                    <p className="text-primary text-xs italic font-medium">
                      {item.highlight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 md:p-10 border border-primary/20 bg-primary/5 rounded-2xl text-center max-w-4xl mx-auto judging-desc backdrop-blur-md">
          <h4 className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Final Note</h4>
          <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
            "Even a basic prototype with a powerful idea and clear execution plan can stand out. Focus on <span className="text-primary">vision, clarity, and impact</span>."
          </p>
        </div>
      </div>
    </section>
  );
};

export default JudgingCriteria;
