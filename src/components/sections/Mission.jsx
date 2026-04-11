import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsDesktop } from '../../hooks/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const lineRef = useRef(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: '100%', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.from(['.mission-header > *', '.mission-desc'], {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.from(statsRef.current, {
        opacity: 0, scale: 0.8, y: 60, rotationX: 15,
        duration: 0.8, stagger: 0.12, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMove = (e, el) => {
    if (!isDesktop) return;          // skip 3-D tilt on mobile
    const isTouch = e.type.startsWith('touch');
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    const clampedX = Math.max(-0.5, Math.min(0.5, x));
    const clampedY = Math.max(-0.5, Math.min(0.5, y));
    gsap.to(el, {
      rotationY: clampedX * 15, rotationX: -clampedY * 15,
      duration: 0.3, ease: 'power2.out', transformPerspective: 800,
    });
  };
  const handleLeave = (el) => {
    if (!isDesktop) return;
    gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
      value: 'APR 21', label: 'Date', suffix: ''
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      value: '6 HRS', label: 'Duration', suffix: ''
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      value: '2–4', label: 'Team Size', suffix: ''
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
          <line x1="12" x2="12" y1="1" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      value: '₹200', label: 'Per Team', suffix: ''
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-32 relative z-10 border-t border-white/5">
      <div ref={lineRef} className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" style={{ width: 0 }}></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div ref={textRef}>
            <div className="flex flex-col items-center text-center mb-6 mission-header">
              <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">THE MISSION</p>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
                IT'S NOT JUST A <span className="text-primary">HACKATHON.</span>
              </h2>
            </div>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed mission-desc">
              Whether you're a software wizard or a hardware geek, it's time to innovate the grid! ENERGIZE 2026 challenges you to build the future of sustainable energy technology.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed mission-desc">
              Organized by the <span className="text-accent font-semibold">IETE Students' Forum</span> at <span className="text-white font-semibold">Rajalakshmi Institute of Technology</span>, this high-stakes on-spot hackathon is where code meets carbon neutrality — in association with <span className="text-primary font-semibold">Insha Consulting Experts Private Limited</span> and <span className="text-[#c084fc] font-semibold">Wyntrix</span>.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  ref={el => statsRef.current[i] = el}
                  className="bg-carbon border border-white/5 p-5 md:p-8 rounded-lg text-center hover:border-primary/50 transition-colors group cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMove(e, statsRef.current[i])}
                  onMouseLeave={() => handleLeave(statsRef.current[i])}
                  onTouchMove={(e) => handleMove(e, statsRef.current[i])}
                  onTouchStart={(e) => handleMove(e, statsRef.current[i])}
                  onTouchEnd={() => handleLeave(statsRef.current[i])}
                >
                  <div className="mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-primary transition-colors mb-2">
                    {stat.value}
                  </div>
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
