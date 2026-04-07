import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ritLogo from '../../assets/rit-logo.png';
import ieteLogo from '../../assets/iete-logo.png';
import inshaLogo from '../../assets/insha-logo.png';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  { name: 'RIT Chennai', img: ritLogo, filterClass: 'brightness-100' },
  { name: 'IETE ISF', img: ieteLogo, filterClass: 'brightness-0 invert' },
  { name: 'Insha Consulting Experts', img: inshaLogo, filterClass: 'brightness-100 bg-white p-1 rounded', imgClass: 'max-h-14' },
];

const MarqueeRow = ({ items, reverse = false, speed = 30 }) => (
  <div className="flex gap-8 group" style={{ overflow: 'hidden' }}>
    <div
      className="flex gap-8 shrink-0 group-hover:[animation-play-state:paused]"
      style={{
        animation: `${reverse ? 'marquee-scroll-reverse' : 'marquee-scroll'} ${speed}s linear infinite`,
        width: 'max-content'
      }}
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <div
          key={i}
          className="h-20 w-48 bg-carbon border border-white/10 rounded-sm flex items-center justify-center shrink-0 hover:border-primary/50 hover:bg-[#0a1510] hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] hover:scale-105 transition-all duration-300 cursor-pointer group/item px-4"
        >
          {item.img ? (
            <img src={item.img} alt={item.name} className={`${item.imgClass || 'max-h-10'} max-w-full object-contain transition-all duration-300 ${item.filterClass || ''}`} />
          ) : (
            <span className="font-mono text-zinc-500 text-sm font-bold uppercase tracking-widest group-hover/item:text-primary transition-colors duration-300">{item.name}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

/* ── Chip data ─────────────────────────────────────────── */
const chips = [
  {
    href: 'https://www.linkedin.com/in/mohamed-r-87584a29b',
    target: '_blank',
    hoverClass: 'hover:border-[#0077b5]/60 hover:text-[#0077b5]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-[#0077b5] shrink-0">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: <><span className="font-semibold text-zinc-200">MD:</span> Mohamed Razik.M</>,
  },
  {
    href: 'tel:+917904006411',
    hoverClass: 'hover:border-primary/40 hover:text-primary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: '+91-7904006411',
  },
  {
    href: 'mailto:Info@inshaeducation.com',
    hoverClass: 'hover:border-primary/40 hover:text-primary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Info@inshaeducation.com',
  },
  {
    href: 'https://www.inshaeducation.com',
    target: '_blank',
    hoverClass: 'hover:border-primary/40 hover:text-primary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
    label: 'www.inshaeducation.com',
  },
];

/* ── Corner accent lines ───────────────────────────────── */
const Corner = ({ pos }) => {
  const base = 'absolute w-5 h-5 border-primary/50';
  const map = {
    tl: 'top-0 left-0 border-t-2 border-l-2',
    tr: 'top-0 right-0 border-t-2 border-r-2',
    bl: 'bottom-0 left-0 border-b-2 border-l-2',
    br: 'bottom-0 right-0 border-b-2 border-r-2',
  };
  return <span className={`${base} ${map[pos]}`} />;
};

const SponsorsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(['.sponsors-header > *', '.sponsors-desc'], {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.from('.marquee-row', {
        opacity: 0, x: (i) => i === 0 ? -100 : 100,
        duration: 1.2, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = sponsors.slice(0, 6);
  const row2 = sponsors.slice(6);

  return (
    <section id="sponsors" ref={sectionRef} className="py-16 md:py-32 relative z-10 border-t border-white/5 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-12">
        <div className="sponsors-header flex flex-col items-center text-center mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14h2" /><path d="m3 3 2.08 1.56a2 2 0 0 0 1.68.34l.47-.14a5.79 5.79 0 0 1 5.15.78" />
            </svg>
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">OUR PARTNERS</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            POWERED BY <span className="text-primary">THE BEST</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-6 max-w-xl mx-auto text-center sponsors-desc">Our partners and sponsors fuel the mission.</p>
      </div>

      <div className="flex flex-col gap-6 opacity-70">
        <div className="marquee-row"><MarqueeRow items={row1} speed={35} /></div>
        <div className="marquee-row"><MarqueeRow items={row2} reverse speed={40} /></div>
      </div>

      {/* ── Featured Sponsor ──────────────────────────────── */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl mt-20 md:mt-28">

        {/* Label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-[10px] font-black tracking-[0.3em] text-primary uppercase">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
            />
            Platinum Sponsor
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="relative rounded-sm border border-primary/20 bg-[#020d06] overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          whileHover={{
            scale: 1.012,
            boxShadow: '0 0 100px rgba(0,230,118,0.25), 0 0 40px rgba(0,230,118,0.1)',
            borderColor: 'rgba(0,230,118,0.45)',
            transition: { duration: 0.35, ease: 'easeOut' },
          }}
          style={{ boxShadow: '0 0 50px rgba(0,230,118,0.07)' }}
        >
          {/* Corner accents */}
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />

          {/* Top glow bar */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(0,230,118,0.06) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
          />

          {/* Floating dot particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/20 pointer-events-none"
              style={{
                left: `${12 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Body */}
          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-14 p-8 md:p-12">

            {/* Logo block */}
            <div className="shrink-0 flex flex-col items-center gap-3">
              {/* Pulsing halo */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="relative bg-white rounded-xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)] w-44 md:w-52 flex items-center justify-center"
                  whileHover={{ scale: 1.07, rotate: 1.5 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                >
                  <img src={inshaLogo} alt="Insha Consulting Experts" className="max-h-16 w-auto object-contain" />
                </motion.div>
              </div>
              <motion.span
                className="text-[10px] font-black tracking-[0.2em] uppercase text-primary/50"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Official Partner
              </motion.span>
            </div>

            {/* Vertical divider */}
            <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

            {/* Details */}
            <motion.div
              className="flex-1 flex flex-col gap-5 text-center md:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.3 }}
            >
              {/* Company name */}
              <div>
                <motion.h3
                  className="text-2xl md:text-3xl font-display font-black tracking-tight text-white leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  Insha Consulting Experts
                  <span className="block text-zinc-500 text-sm md:text-base font-normal tracking-normal mt-0.5">Private Limited</span>
                </motion.h3>
                <motion.p
                  className="mt-2 text-primary/80 text-[11px] font-bold tracking-[0.18em] uppercase"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  Overseas Education Consulting &amp; Manpower Recruitment
                </motion.p>
              </div>

              {/* Chips — staggered */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center md:justify-start">
                {chips.map((chip, i) => (
                  <motion.a
                    key={i}
                    href={chip.href}
                    target={chip.target}
                    rel={chip.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className={`inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 transition-all duration-200 ${chip.hoverClass}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.04 }}
                  >
                    {chip.icon}
                    {chip.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom glow bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;
