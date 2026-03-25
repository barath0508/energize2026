import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const nodesRef = useRef([]);

  const timelineItems = [
    { tag: 'PHASE 01', time: 'OCT 10, 2026', title: 'Registration Opens', right: false },
    { tag: 'PHASE 02', time: 'OCT 20, 2026', title: 'Registration Closes', right: true },
    { tag: 'PHASE 03', time: 'OCT 24, 2026 • 10:00 AM', title: 'Opening Ceremony', right: false },
    { tag: 'PHASE 04', time: 'OCT 24, 2026 • 12:00 PM', title: 'Hacking Begins', right: true },
    { tag: 'PHASE 05', time: 'OCT 25, 2026 • 12:00 PM', title: 'Hacking Ends / Judging', right: false },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('.timeline-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      // Line drawing animation
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });

      // Timeline items staggered entrance with parallax
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isRight = timelineItems[i].right;
        
        gsap.fromTo(item,
          { opacity: 0, x: isRight ? 80 : -80, y: 30 },
          {
            opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Node scale-up as line reaches them
      nodesRef.current.forEach((node) => {
        if (!node) return;
        gsap.fromTo(node,
          { scale: 0 },
          {
            scale: 1, duration: 0.5, ease: 'back.out(3)',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Card glow activation as they scroll into view
      itemsRef.current.forEach((item) => {
        if (!item) return;
        const card = item.querySelector('.timeline-card');
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: () => gsap.to(card, { borderColor: 'rgba(250,204,21,0.4)', boxShadow: '0 0 20px rgba(250,204,21,0.1)', duration: 0.5 }),
          onLeaveBack: () => gsap.to(card, { borderColor: 'rgba(255,255,255,0.05)', boxShadow: 'none', duration: 0.5 }),
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 timeline-header">
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white">
            THE <span className="text-primary text-glow">PROTOCOL</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">Follow the timeline and ensure you're ready when the signal lights up.</p>
        </div>

        <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
          {/* Background Vertical Line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-white/10"></div>
          
          {/* Active Line */}
          <div ref={lineRef} className="absolute top-0 left-8 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-primary shadow-[0_0_15px_rgba(250,204,21,0.5)] origin-top" style={{ height: 0 }}></div>

          {/* Timeline Items */}
          {timelineItems.map((item, i) => (
            <div 
              key={i} 
              ref={el => itemsRef.current[i] = el}
              className={`relative mb-12 md:w-1/2 ${item.right ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'} pl-12`}
            >
              {/* Node */}
              <div 
                ref={el => nodesRef.current[i] = el}
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-[3px] border-primary shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                style={item.right ? { left: '-10px' } : { left: '-10px', ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? { left: 'auto', right: '-10px' } : {}) }}
              >
                {/* Pulse ring */}
                <span className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full border-2 border-primary animate-node-pulse"></span>
              </div>
              
              <div className="timeline-card bg-carbon border border-white/5 p-6 rounded-lg hover:border-primary/30 transition-all duration-500 group">
                <span className="text-primary text-xs font-bold tracking-widest">{item.tag}</span>
                <h4 className="text-xl font-display font-bold text-white mt-1 mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <div className="text-zinc-500 text-sm font-mono">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
