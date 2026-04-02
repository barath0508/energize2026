import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RewardCard = ({
  title,
  amount,
  subtitle,
  icon,
  badgeText,
  description,
  colorScheme = "primary",
  className = ""
}) => {

  const getThemeClasses = () => {
    switch (colorScheme) {
      case 'primary': return {
        badgeBorder: 'border-primary/30', badgeBg: 'bg-primary/5', badgeText: 'text-primary', badgeShadow: 'shadow-[0_0_10px_rgba(0,230,118,0.05)]', badgeHover: 'group-hover:bg-primary/10',
        iconColor: 'text-primary',
        amountColor: 'text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]',
        titleColor: 'text-primary/70',
        hoverBorder: 'hover:border-primary/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(0,230,118,0.08)]',
        bottomLine: 'bg-primary'
      };
      case 'accent': return {
        badgeBorder: 'border-accent/30', badgeBg: 'bg-accent/5', badgeText: 'text-accent', badgeShadow: 'shadow-[0_0_10px_rgba(0,188,212,0.05)]', badgeHover: 'group-hover:bg-accent/10',
        iconColor: 'text-accent',
        amountColor: 'text-accent group-hover:drop-shadow-[0_0_8px_rgba(0,188,212,0.5)]',
        titleColor: 'text-accent/70',
        hoverBorder: 'hover:border-accent/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(0,188,212,0.08)]',
        bottomLine: 'bg-accent'
      };
      case 'orange': return {
        badgeBorder: 'border-orange-500/30', badgeBg: 'bg-orange-500/5', badgeText: 'text-orange-500', badgeShadow: 'shadow-[0_0_10px_rgba(249,115,22,0.05)]', badgeHover: 'group-hover:bg-orange-500/10',
        iconColor: 'text-orange-500',
        amountColor: 'text-orange-500 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]',
        titleColor: 'text-orange-500/70',
        hoverBorder: 'hover:border-orange-500/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.08)]',
        bottomLine: 'bg-orange-500'
      };
      case 'purple': return {
        badgeBorder: 'border-purple-500/30', badgeBg: 'bg-purple-500/5', badgeText: 'text-purple-500', badgeShadow: 'shadow-[0_0_10px_rgba(168,85,247,0.05)]', badgeHover: 'group-hover:bg-purple-500/10',
        iconColor: 'text-purple-500',
        amountColor: 'text-purple-500 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]',
        titleColor: 'text-purple-500/70',
        hoverBorder: 'hover:border-purple-500/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.08)]',
        bottomLine: 'bg-purple-500'
      };
      case 'zinc': return {
        badgeBorder: 'border-zinc-200/30', badgeBg: 'bg-zinc-200/5', badgeText: 'text-zinc-200', badgeShadow: 'shadow-[0_0_10px_rgba(228,228,231,0.05)]', badgeHover: 'group-hover:bg-zinc-200/10',
        iconColor: 'text-zinc-200',
        amountColor: 'text-zinc-200 group-hover:drop-shadow-[0_0_8px_rgba(228,228,231,0.5)]',
        titleColor: 'text-zinc-200/70',
        hoverBorder: 'hover:border-zinc-200/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(228,228,231,0.08)]',
        bottomLine: 'bg-zinc-200'
      };
      default: return {
        badgeBorder: 'border-zinc-200/30', badgeBg: 'bg-zinc-200/5', badgeText: 'text-zinc-200', badgeShadow: 'shadow-[0_0_10px_rgba(228,228,231,0.05)]', badgeHover: 'group-hover:bg-zinc-200/10',
        iconColor: 'text-zinc-200',
        amountColor: 'text-zinc-200 group-hover:drop-shadow-[0_0_8px_rgba(228,228,231,0.5)]',
        titleColor: 'text-zinc-200/70',
        hoverBorder: 'hover:border-zinc-200/40', hoverShadow: 'hover:shadow-[0_0_25px_rgba(228,228,231,0.08)]',
        bottomLine: 'bg-zinc-200'
      };
    }
  };

  const theme = getThemeClasses();

  return (
    <div className={`reward-card-anim relative bg-transparent border border-white/5 p-6 md:p-8 rounded-sm ${theme.hoverBorder} ${theme.hoverShadow} hover:scale-[1.02] transition-all duration-500 flex flex-col h-full group cursor-default ${className}`}>

      {/* Top Flex Row */}
      <div className="flex justify-between items-start mb-10">
        <div className={`px-3 py-1 rounded-full border ${theme.badgeBorder} ${theme.badgeBg} ${theme.badgeText} text-[10px] font-bold tracking-[0.1em] uppercase ${theme.badgeShadow} ${theme.badgeHover} transition-all duration-300`}>
          {badgeText}
        </div>
        <div className={`w-8 h-8 ${theme.iconColor}`}>
          {icon}
        </div>
      </div>

      {/* Middle Block */}
      <div className="text-left mb-8">
        <h3 className={`text-3xl md:text-5xl font-display font-black mb-3 transition-all duration-300 ${theme.amountColor}`}>
          {amount}
        </h3>
        <p className="text-zinc-300 text-xs md:text-sm tracking-wide uppercase font-bold">{subtitle}</p>
      </div>

      {/* Bottom Block */}
      <div className="text-left mt-auto pb-2">
        <p className={`text-[11px] font-black tracking-[0.15em] mb-3 uppercase ${theme.titleColor}`}>
          {title}
        </p>
        <p className="text-zinc-400 text-[13px] md:text-sm leading-relaxed font-light">
          {description}
        </p>
      </div>

      {/* Animated Bottom Glow Line */}
      <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${theme.bottomLine} group-hover:w-full transition-all duration-700 rounded-full`}></div>
    </div>
  );
};

const Rewards = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Force scroll calculations to update after all DOM/images settle
      setTimeout(() => ScrollTrigger.refresh(), 500);

      gsap.fromTo(['.rewards-header > *', '.rewards-desc'],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          clearProps: "all"
        }
      );

      gsap.fromTo('.reward-card-anim',
        { y: 80, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          clearProps: "all"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const WinnerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-primary">
      <defs>
        <linearGradient id="winner-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00e676" />
        </linearGradient>
      </defs>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="url(#winner-grad)" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="url(#winner-grad)" /><path d="M4 22h16" stroke="url(#winner-grad)" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" stroke="url(#winner-grad)" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" stroke="url(#winner-grad)" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="url(#winner-grad)" />
      <circle cx="12" cy="7" r="2.5" fill="#00e676" opacity="0.6" stroke="none" />
      <path d="M12 2v2" stroke="#00e676" strokeWidth="2" opacity="0.8" />
      <path d="M8 4l2 1" stroke="#00e676" strokeWidth="2" opacity="0.8" />
      <path d="M16 4l-2 1" stroke="#00e676" strokeWidth="2" opacity="0.8" />
    </svg>
  );

  const RunnerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-accent">
      <defs>
        <linearGradient id="runner-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#00bcd4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="11" r="5" stroke="url(#runner-grad)" />
      <path d="M12 4v2" stroke="url(#runner-grad)" />
      <path d="M15.5 15.5L19 21l-3-1.5L14 21v-4.5" stroke="url(#runner-grad)" />
      <path d="M8.5 15.5L5 21l3-1.5L10 21v-4.5" stroke="url(#runner-grad)" />
      <circle cx="12" cy="11" r="2.5" fill="#00bcd4" opacity="0.6" stroke="none" />
    </svg>
  );

  const ThirdIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-orange-500">
      <defs>
        <linearGradient id="third-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <path d="M12 15v5" stroke="url(#third-grad)" />
      <path d="M10 20h4" stroke="url(#third-grad)" />
      <path d="M7.5 4.5l2 2" stroke="url(#third-grad)" />
      <path d="M16.5 4.5l-2 2" stroke="url(#third-grad)" />
      <circle cx="12" cy="9" r="4" stroke="url(#third-grad)" />
      <circle cx="12" cy="9" r="1.5" fill="#f97316" opacity="0.6" stroke="none" />
      <path d="M5 12h2" stroke="url(#third-grad)" />
      <path d="M17 12h2" stroke="url(#third-grad)" />
    </svg>
  );

  const CertIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-purple-500">
      <defs>
        <linearGradient id="cert-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="url(#cert-grad)" />
      <circle cx="9" cy="10" r="2" fill="#ffffff" opacity="0.6" stroke="none" />
      <path d="M15 8h2" stroke="url(#cert-grad)" />
      <path d="M15 12h2" stroke="url(#cert-grad)" />
      <path d="M15 16h2" stroke="url(#cert-grad)" />
      <path d="M9 12v6" stroke="url(#cert-grad)" opacity="0.8" />
      <path d="M7 16l2 2 4-4" stroke="url(#cert-grad)" />
    </svg>
  );

  return (
    <section id="prizes" ref={sectionRef} className="py-16 md:py-32 lg:py-40 relative z-10 border-t border-white/5 bg-gradient-to-b from-black/90 via-surface to-black/90 overflow-hidden pointer-events-auto">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-40 mix-blend-screen" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="rewards-header flex flex-col items-center text-center mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">PRIZES & REWARDS</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase">
            <span className="text-primary">HONOR </span>  AND <span className="text-primary">REWARDS</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto text-center rewards-desc">Awards given separately for Software & Hardware Tracks.</p>

        {/* KEY FIX: grid-rows-2 + explicit row sizing so both rows are equal height */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-6 lg:gap-8 lg:p-4" style={{ gridAutoRows: '1fr' }}>

          <RewardCard
            badgeText="WINNER"
            title="THE CHAMPION"
            amount="₹3,000"
            subtitle="SOFTWARE & HARDWARE"
            description="The ultimate victor. Cash prize and a guaranteed certificate of excellence await the champion team."
            icon={WinnerIcon}
            colorScheme="primary"
          />

          <RewardCard
            badgeText="RUNNER UP"
            title="THE CRUSADER"
            amount="₹2,000"
            subtitle="SOFTWARE & HARDWARE"
            description="Excellence recognized. Cash prize and certificates of achievement for the runner-up team."
            icon={RunnerIcon}
            colorScheme="accent"
          />

          <RewardCard
            badgeText="2ND RUNNER UP"
            title="THE CONTENDER"
            amount="₹1,000"
            subtitle="SOFTWARE & HARDWARE"
            description="Outstanding performance. Cash prize and certificates of achievement for the second runner-up team."
            icon={ThirdIcon}
            colorScheme="orange"
          />

          <RewardCard
            badgeText="PARTICIPANT"
            title="THE SCHOLAR"
            amount="Certificate"
            subtitle="For All"
            description="Honor and recognition for all who participated and submitted a valid project."
            icon={CertIcon}
            colorScheme="purple"
          />

        </div>
      </div>
    </section>
  );
};

export default Rewards;