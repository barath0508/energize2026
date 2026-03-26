import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlowSpotlight = ({ isHovered, mousePosition, color }) => (
  <div 
    className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
    style={{
      opacity: isHovered ? 1 : 0,
      background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent 40%)`
    }}
  />
);

const RewardCard = ({ 
  title, 
  amount, 
  subtitle, 
  icon, 
  type, 
  className = ""
}) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile && cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 'random(-6, 6)',
        rotateY: 'random(-6, 6)',
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
      setIsHovered(true);
      setMousePosition({ x: 150, y: 150 });
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      translateZ: 30,
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out"
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;
    
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out"
    });
  }, []);

  const getBorderGradient = () => {
    if (type === 'winner') return 'from-primary/60 via-primary to-primary/60';
    if (type === 'runner') return 'from-accent/60 via-accent to-accent/60';
    return 'from-white/30 via-white/50 to-white/30';
  };

  const getBgGlow = () => {
    if (type === 'winner') return 'rgba(0, 230, 118, 0.2)';
    if (type === 'runner') return 'rgba(0, 188, 212, 0.15)';
    return 'rgba(255, 255, 255, 0.1)';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-2xl p-[1px] ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${getBorderGradient()} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative h-full w-full rounded-2xl bg-surface/90 backdrop-blur-xl overflow-visible flex flex-col items-center justify-center p-8 z-10" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* Overflow hidden container for spotlight */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <GlowSpotlight isHovered={isHovered} mousePosition={mousePosition} color={getBgGlow()} />
          
          {type === 'winner' && (
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(0,230,118,0.4) 0%, transparent 70%)' }} />
          )}
        </div>

        <div className="relative z-20 flex flex-col items-center w-full" style={{ transform: 'translateZ(40px)' }}>
          {/* Badge */}
          <div className="absolute -top-[5rem] left-1/2 -translate-x-1/2 flex items-center justify-center">
            {type === 'winner' && (
              <div className="bg-primary/20 border border-primary text-primary px-5 py-1.5 rounded-full font-bold text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(0,230,118,0.4)] backdrop-blur-md uppercase whitespace-nowrap">
                1st Prize
              </div>
            )}
            {type === 'runner' && (
              <div className="bg-accent/20 border border-accent text-accent px-5 py-1.5 rounded-full font-bold text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(0,188,212,0.4)] backdrop-blur-md uppercase whitespace-nowrap">
                2nd Prize
              </div>
            )}
            {type === 'participant' && (
              <div className="bg-white/10 border border-white/20 text-white px-5 py-1.5 rounded-full font-bold text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md uppercase whitespace-nowrap">
                Finalists
              </div>
            )}
          </div>

          <div className={`w-24 h-24 md:w-28 md:h-28 mb-8 relative flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${type === 'winner' ? 'drop-shadow-[0_0_30px_rgba(0,230,118,0.6)]' : type === 'runner' ? 'drop-shadow-[0_0_20px_rgba(0,188,212,0.4)]' : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent blur-xl rounded-full" />
            {icon}
          </div>

          <h3 className={`text-5xl md:text-5xl lg:text-6xl font-display font-black mb-3 ${
            type === 'winner' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-primary filter drop-shadow-[0_0_15px_rgba(0,230,118,0.4)]' : 
            type === 'runner' ? 'text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-accent' : 
            'text-white'
          }`}>
            {amount}
          </h3>

          <p className="text-xl md:text-2xl font-bold text-white mb-2">{title}</p>
          <p className={`text-sm font-medium tracking-widest uppercase ${
            type === 'winner' ? 'text-primary/90 font-bold' : 
            type === 'runner' ? 'text-accent/90 font-bold' : 
            'text-zinc-400'
          }`}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const Rewards = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.rewards-header > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.from('.reward-card-anim', {
        y: 120,
        opacity: 0,
        rotationX: 25,
        scale: 0.85,
        duration: 1.2,
        stagger: {
          each: 0.2,
          from: "center"
        },
        ease: 'back.out(1.2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.to('.rewards-grid-container', {
        y: -20,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const WinnerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#winner-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-primary">
      <defs>
        <linearGradient id="winner-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00e676" />
        </linearGradient>
      </defs>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      <circle cx="12" cy="7" r="2.5" fill="#00e676" opacity="0.6" />
      <path d="M12 2v2" stroke="#00e676" strokeWidth="2" opacity="0.8"/>
      <path d="M8 4l2 1" stroke="#00e676" strokeWidth="2" opacity="0.8"/>
      <path d="M16 4l-2 1" stroke="#00e676" strokeWidth="2" opacity="0.8"/>
    </svg>
  );

  const RunnerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#runner-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-accent">
      <defs>
        <linearGradient id="runner-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00bcd4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="11" r="5" />
      <path d="M12 4v2" />
      <path d="M15.5 15.5L19 21l-3-1.5L14 21v-4.5" />
      <path d="M8.5 15.5L5 21l3-1.5L10 21v-4.5" />
      <circle cx="12" cy="11" r="2.5" fill="#00bcd4" opacity="0.6" />
    </svg>
  );

  const CertIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="url(#cert-grad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-zinc-300">
      <defs>
        <linearGradient id="cert-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a1a1aa" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" fill="#ffffff" opacity="0.6" />
      <path d="M15 8h2" />
      <path d="M15 12h2" />
      <path d="M15 16h2" />
      <path d="M9 12v6" stroke="#00e676" opacity="0.8" />
      <path d="M7 16l2 2 4-4" stroke="#00e676" />
    </svg>
  );

  return (
    <section id="prizes" ref={sectionRef} className="py-24 md:py-32 lg:py-40 relative z-10 border-t border-white/5 bg-gradient-to-b from-black/90 via-surface to-black/90 overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-40 mix-blend-screen" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="rewards-header flex flex-col items-center text-center mb-28 md:mb-36">
          <div className="p-4 border border-white/10 rounded-2xl bg-surface/80 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(0,230,118,0.1)] relative group">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary w-full h-full">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
          </div>
          <p className="text-primary/90 font-bold tracking-[0.2em] mb-4 uppercase text-sm">Prizes & Recognition</p>
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter text-white mb-6 uppercase">
            Claim The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#69f0ae] to-accent">Reward</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Exceptional ideas deserve extraordinary recognition. Bring your best sustainable energy solutions and win massive bounties.
          </p>
        </div>

        <div className="rewards-grid-container relative perspective-1000 mt-8 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-6 lg:gap-10 max-w-6xl mx-auto items-center">
            
            <RewardCard 
              type="runner"
              title="Cash Prize"
              amount="₹1,500"
              subtitle="Runner Up"
              icon={RunnerIcon}
              className="reward-card-anim order-2 md:order-1 md:scale-95 h-[24rem] md:h-[26rem] md:hover:scale-[1.02] md:translate-y-12 z-10"
            />
            
            <RewardCard 
              type="winner"
              title="Cash Prize"
              amount="₹3,000"
              subtitle="Champion Team"
              icon={WinnerIcon}
              className="reward-card-anim order-1 md:order-2 z-20 h-[28rem] md:h-[30rem] md:-translate-y-8 shadow-[0_0_50px_rgba(0,230,118,0.2)] ring-1 ring-primary/40"
            />

            <RewardCard 
              type="participant"
              title="Certificates"
              amount="For All"
              subtitle="All Participants"
              icon={CertIcon}
              className="reward-card-anim order-3 md:order-3 md:scale-95 h-[24rem] md:h-[26rem] md:hover:scale-[1.02] md:translate-y-12 z-10"
            />
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
