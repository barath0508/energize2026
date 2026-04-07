import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── theme map ─────────────────────────────────────────────── */
const THEMES = {
  primary: {
    accent: '#00e676',
    rgb: '0,230,118',
    badge: 'border-[#00e676]/30 bg-[#00e676]/5 text-[#00e676]',
    amount: 'text-[#00e676]',
    border: 'border-[#00e676]/15',
    hoverBorder: 'rgba(0,230,118,0.5)',
    glow: '0 0 80px rgba(0,230,118,0.18)',
    barBg: 'bg-[#00e676]',
    particle: 'bg-[#00e676]',
    label: 'text-[#00e676]/70',
  },
  accent: {
    accent: '#00bcd4',
    rgb: '0,188,212',
    badge: 'border-[#00bcd4]/30 bg-[#00bcd4]/5 text-[#00bcd4]',
    amount: 'text-[#00bcd4]',
    border: 'border-[#00bcd4]/15',
    hoverBorder: 'rgba(0,188,212,0.5)',
    glow: '0 0 80px rgba(0,188,212,0.18)',
    barBg: 'bg-[#00bcd4]',
    particle: 'bg-[#00bcd4]',
    label: 'text-[#00bcd4]/70',
  },
  orange: {
    accent: '#f97316',
    rgb: '249,115,22',
    badge: 'border-orange-500/30 bg-orange-500/5 text-orange-400',
    amount: 'text-orange-400',
    border: 'border-orange-500/15',
    hoverBorder: 'rgba(249,115,22,0.5)',
    glow: '0 0 80px rgba(249,115,22,0.18)',
    barBg: 'bg-orange-500',
    particle: 'bg-orange-400',
    label: 'text-orange-500/70',
  },
  purple: {
    accent: '#a855f7',
    rgb: '168,85,247',
    badge: 'border-purple-500/30 bg-purple-500/5 text-purple-400',
    amount: 'text-purple-400',
    border: 'border-purple-500/15',
    hoverBorder: 'rgba(168,85,247,0.5)',
    glow: '0 0 80px rgba(168,85,247,0.18)',
    barBg: 'bg-purple-500',
    particle: 'bg-purple-400',
    label: 'text-purple-500/70',
  },
};

/* ─── RewardCard ────────────────────────────────────────────── */
const RewardCard = ({ title, amount, subtitle, icon, badgeText, description, colorScheme = 'primary', index = 0 }) => {
  const t = THEMES[colorScheme] || THEMES.primary;

  return (
    <motion.div
      className={`reward-card-anim relative flex flex-col h-full bg-[#050a07] border ${t.border} rounded-sm overflow-hidden cursor-default`}
      initial={{ opacity: 0, y: 70, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      whileHover={{
        scale: 1.025,
        boxShadow: t.glow,
        borderColor: t.hoverBorder,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{ boxShadow: `0 0 30px rgba(${t.rgb},0.04)` }}
    >
      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `linear-gradient(110deg, transparent 35%, rgba(${t.rgb},0.07) 50%, transparent 65%)`,
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 + index * 0.7, ease: 'easeInOut' }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${t.accent}90, transparent)` }}
      />

      {/* Floating particles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${t.particle} opacity-20 pointer-events-none`}
          style={{ left: `${20 + i * 30}%`, top: `${15 + i * 25}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.2 + i * 0.6, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
        />
      ))}

      {/* Card body */}
      <div className="relative z-10 flex flex-col h-full p-7 md:p-9">

        {/* Top row: badge + icon */}
        <div className="flex justify-between items-start mb-8">
          <motion.div
            className={`px-3 py-1 rounded-full border text-[10px] font-black tracking-[0.15em] uppercase ${t.badge}`}
            whileHover={{ scale: 1.06 }}
          >
            {badgeText}
          </motion.div>
          <motion.div
            className="w-9 h-9"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Amount */}
        <motion.h3
          className={`text-4xl md:text-5xl font-display font-black mb-2 ${t.amount}`}
          animate={{ textShadow: [`0 0 0px ${t.accent}00`, `0 0 18px ${t.accent}80`, `0 0 0px ${t.accent}00`] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
        >
          {amount}
        </motion.h3>
        <p className="text-zinc-300 text-[11px] font-black tracking-[0.18em] uppercase mb-8">{subtitle}</p>

        {/* Title + desc */}
        <div className="mt-auto">
          <p className={`text-[10px] font-black tracking-[0.2em] mb-2 uppercase ${t.label}`}>{title}</p>
          <p className="text-zinc-500 text-[13px] leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Animated bottom progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[3px] ${t.barBg}`}
        initial={{ width: '0%' }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 + index * 0.15 }}
      />
    </motion.div>
  );
};

/* ─── Icons ─────────────────────────────────────────────────── */
const WinnerIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#00e676]">
    <defs><linearGradient id="w-g" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00e676"/></linearGradient></defs>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="url(#w-g)"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="url(#w-g)"/>
    <path d="M4 22h16" stroke="url(#w-g)"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" stroke="url(#w-g)"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" stroke="url(#w-g)"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="url(#w-g)"/>
    <circle cx="12" cy="7" r="2.5" fill="#00e676" opacity="0.6" stroke="none"/>
  </svg>
);

const RunnerIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[#00bcd4]">
    <defs><linearGradient id="r-g" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00bcd4"/></linearGradient></defs>
    <circle cx="12" cy="11" r="5" stroke="url(#r-g)"/>
    <path d="M12 4v2" stroke="url(#r-g)"/>
    <path d="M15.5 15.5L19 21l-3-1.5L14 21v-4.5" stroke="url(#r-g)"/>
    <path d="M8.5 15.5L5 21l3-1.5L10 21v-4.5" stroke="url(#r-g)"/>
    <circle cx="12" cy="11" r="2.5" fill="#00bcd4" opacity="0.6" stroke="none"/>
  </svg>
);

const ThirdIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-orange-400">
    <defs><linearGradient id="t-g" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
    <path d="M12 15v5" stroke="url(#t-g)"/><path d="M10 20h4" stroke="url(#t-g)"/>
    <path d="M7.5 4.5l2 2" stroke="url(#t-g)"/><path d="M16.5 4.5l-2 2" stroke="url(#t-g)"/>
    <circle cx="12" cy="9" r="4" stroke="url(#t-g)"/>
    <circle cx="12" cy="9" r="1.5" fill="#f97316" opacity="0.6" stroke="none"/>
    <path d="M5 12h2" stroke="url(#t-g)"/><path d="M17 12h2" stroke="url(#t-g)"/>
  </svg>
);

const CertIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-purple-400">
    <defs><linearGradient id="c-g" x1="0" y1="0" x2="0" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#a855f7"/></linearGradient></defs>
    <rect x="3" y="4" width="18" height="16" rx="2" stroke="url(#c-g)"/>
    <circle cx="9" cy="10" r="2" fill="#ffffff" opacity="0.6" stroke="none"/>
    <path d="M15 8h2" stroke="url(#c-g)"/><path d="M15 12h2" stroke="url(#c-g)"/>
    <path d="M15 16h2" stroke="url(#c-g)"/>
    <path d="M9 12v6" stroke="url(#c-g)" opacity="0.8"/>
    <path d="M7 16l2 2 4-4" stroke="url(#c-g)"/>
  </svg>
);

/* ─── Section ───────────────────────────────────────────────── */
const Rewards = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      setTimeout(() => ScrollTrigger.refresh(), 500);
      gsap.fromTo(
        ['.rewards-header > *', '.rewards-desc'],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cards = [
    { badgeText: 'WINNER', title: 'THE CHAMPION', amount: '₹3,000', subtitle: 'SOFTWARE & HARDWARE', description: 'The ultimate victor. Cash prize and a guaranteed certificate of excellence await the champion team.', icon: WinnerIcon, colorScheme: 'primary' },
    { badgeText: 'RUNNER UP', title: 'THE CRUSADER', amount: '₹2,000', subtitle: 'SOFTWARE & HARDWARE', description: 'Excellence recognized. Cash prize and certificates of achievement for the runner-up team.', icon: RunnerIcon, colorScheme: 'accent' },
    { badgeText: '2ND RUNNER UP', title: 'THE CONTENDER', amount: '₹1,000', subtitle: 'SOFTWARE & HARDWARE', description: 'Outstanding performance. Cash prize and certificates of achievement for the second runner-up team.', icon: ThirdIcon, colorScheme: 'orange' },
    { badgeText: 'PARTICIPANT', title: 'THE SCHOLAR', amount: 'Certificate', subtitle: 'For All', description: 'Honor and recognition for all who participated and submitted a valid project.', icon: CertIcon, colorScheme: 'purple' },
  ];

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="py-16 md:py-32 lg:py-40 relative z-10 border-t border-white/5 bg-gradient-to-b from-black/90 via-surface to-black/90 overflow-hidden pointer-events-auto"
    >
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[140px] pointer-events-none opacity-40 mix-blend-screen" />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Header */}
        <div className="rewards-header flex flex-col items-center text-center mb-6">
          <motion.div
            className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4"
            whileInView={{ boxShadow: ['0 0 0px rgba(0,230,118,0)', '0 0 20px rgba(0,230,118,0.2)', '0 0 0px rgba(0,230,118,0)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            viewport={{ once: false }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </motion.div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">PRIZES &amp; REWARDS</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white uppercase">
            <span className="text-primary">HONOR </span>AND <span className="text-primary">REWARDS</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto text-center rewards-desc">
          Awards given separately for Software &amp; Hardware Tracks.
        </p>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8" style={{ gridAutoRows: '1fr' }}>
          {cards.map((card, i) => (
            <RewardCard key={card.badgeText} {...card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rewards;