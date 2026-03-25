import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal line draws from left
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: '100%', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      // Text children stagger in
      gsap.from(textRef.current.children, {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      // Stat cards entrance with 3D feel
      gsap.from(statsRef.current, {
        opacity: 0, scale: 0.8, y: 60, rotationX: 15,
        duration: 0.8, stagger: 0.12, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      });

      // Counter animations
      const statValues = ['24', '5', '10000', '500'];
      statsRef.current.forEach((el, i) => {
        if (!el) return;
        const numEl = el.querySelector('.stat-number');
        if (!numEl) return;
        const target = parseInt(statValues[i]);
        gsap.fromTo(numEl, 
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
          }
        );
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 3D tilt handler for stat cards
  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotationY: x * 15,
      rotationX: -y * 15,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800,
    });
  };
  const handleMouseLeave = (el) => {
    gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  const stats = [
    { value: '24', label: 'Hours', suffix: '' },
    { value: '5+', label: 'Domains', suffix: '+' },
    { value: '$10k+', label: 'Prizes', suffix: 'k+', prefix: '$' },
    { value: '500+', label: 'Hackers', suffix: '+' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      {/* Decorative reveal line */}
      <div ref={lineRef} className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" style={{ width: 0 }}></div>

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
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  ref={el => statsRef.current[i] = el}
                  className="bg-carbon border border-white/5 p-8 rounded-lg text-center hover:border-primary/50 transition-colors group cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMouseMove(e, statsRef.current[i])}
                  onMouseLeave={() => handleMouseLeave(statsRef.current[i])}
                >
                  <div className="text-4xl md:text-5xl font-display font-black text-white group-hover:text-primary transition-colors mb-2">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <span className="stat-number">0</span>
                    {stat.suffix && <span>{stat.suffix}</span>}
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
