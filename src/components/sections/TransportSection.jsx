import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Icons ── */
const BusIcon = ({ size = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/>
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/>
    <circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/>
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.36 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
  </svg>
);
const UserIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ── Data ── */
const routes = [
  { area: 'Koyambedu', icon: '🚏' },
  { area: 'Tambaram',  icon: '🚏' },
  { area: 'Ambattur',  icon: '🚏' },
  { area: 'Porur',     icon: '🚏' },
  { area: 'Avadi',     icon: '🚏' },
  { area: 'Poonamallee', icon: '🚏' },
];

const incharges = [
  { name: 'A. KALESHA',  badge: 'TRANSPORT HELPLINE', phone: '+91 63807 51700', tel: 'tel:+916380751700' },
  { name: 'N. SUDHAKAR', badge: 'TRANSPORT HELPLINE', phone: '+91 75488 62447', tel: 'tel:+917548862447' },
];

/* ── Reusable fade-up wrapper ── */
const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ── Animated bus track ── */
const BusTrack = () => (
  <div className="relative w-full h-10 my-8 overflow-hidden">
    {/* road */}
    <div className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/8" />
    {/* dashed centre line */}
    <div className="absolute inset-y-0 left-0 right-0 top-1/2 -translate-y-1/2 h-px"
      style={{ background: 'repeating-linear-gradient(90deg,rgba(0,230,118,0.35) 0,rgba(0,230,118,0.35) 20px,transparent 20px,transparent 40px)' }}
    />
    {/* moving bus */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 text-primary"
      initial={{ x: '-10%' }}
      animate={{ x: '110%' }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
    >
      <BusIcon size={22} />
    </motion.div>
    {/* glow trail */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 w-16 h-3 rounded-full blur-md bg-primary/20"
      initial={{ x: '-15%' }}
      animate={{ x: '108%' }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
    />
  </div>
);

/* ── Incharge Card ── */
const InchargeCard = ({ person, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative group overflow-hidden rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm
                 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(0,230,118,0.12)] hover:scale-[1.02]
                 transition-all duration-500 p-6 flex flex-col gap-5 cursor-default"
    >
      {/* shimmer sweep on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(0,230,118,0.06) 50%,transparent 70%)' }}
      />

      {/* corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at top right,rgba(0,230,118,0.18),transparent 70%)' }}
      />

      <div className="flex items-center gap-4">
        {/* avatar ring */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center
                          group-hover:bg-primary/20 group-hover:border-primary/60 transition-all duration-400
                          shadow-[0_0_20px_rgba(0,230,118,0.12)]">
            <span className="text-primary"><UserIcon size={22} /></span>
          </div>
          {/* pulsing halo */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>

        <div>
          <span className="px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/5
                           text-primary text-[9px] font-black tracking-[0.14em] uppercase mb-2 inline-block">
            {person.badge}
          </span>
          <h3 className="text-primary font-display font-black text-xl tracking-wide leading-tight">
            {person.name}
          </h3>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4">
        <p className="text-primary/60 text-[10px] font-black tracking-[0.18em] mb-2 uppercase">Contact</p>
        <a
          href={person.tel}
          className="group/ph flex items-center gap-2.5 w-fit"
        >
          <span className="w-7 h-7 rounded-full border border-primary/25 bg-primary/8 flex items-center justify-center
                           text-primary/60 group-hover/ph:text-primary group-hover/ph:border-primary/60
                           group-hover/ph:bg-primary/15 transition-all duration-300 shrink-0">
            <PhoneIcon />
          </span>
          <span className="text-zinc-300 text-[13px] font-mono tracking-wider
                           group-hover/ph:text-primary transition-colors duration-200">
            {person.phone}
          </span>
        </a>
      </div>

      {/* bottom glow bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-primary/80 to-primary/20
                      rounded-full transition-all duration-700" />
    </motion.div>
  );
};

/* ── Main Section ── */
const TransportSection = () => {
  const sectionRef = useRef(null);

  return (
    <section
      id="transport"
      ref={sectionRef}
      className="py-16 md:py-32 relative z-10 border-t border-white/5 bg-[#030a07] overflow-hidden"
    >
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
                      bg-primary/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full
                      bg-primary/[0.04] blur-[100px]" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative">

        {/* ── Header ── */}
        <FadeUp className="flex flex-col items-center text-center mb-4">
          <motion.div
            className="p-3 border border-primary/20 rounded-sm bg-black/60 mb-5 text-primary
                       shadow-[0_0_20px_rgba(0,230,118,0.12)]"
            animate={{ boxShadow: ['0 0 20px rgba(0,230,118,0.10)', '0 0 36px rgba(0,230,118,0.22)', '0 0 20px rgba(0,230,118,0.10)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <BusIcon size={30} />
          </motion.div>
          <p className="text-primary/70 text-xs font-black tracking-[0.25em] mb-2 uppercase">Getting Here</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            EVENT <span className="text-primary drop-shadow-[0_0_16px_rgba(0,230,118,0.5)]">TRANSPORT</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl text-sm leading-relaxed">
            RIT's official transport service runs daily across&nbsp;
            <span className="text-primary font-semibold">51 bus routes</span> covering all major areas
            of Chennai. Participants are welcome to board and reach the venue hassle‑free.
          </p>
        </FadeUp>

        {/* ── Animated Bus Track ── */}
        <BusTrack />

        {/* ── Info Banner ── */}
        <FadeUp delay={0.1} className="mb-12">
          <div className="relative rounded-xl border border-primary/25 bg-primary/[0.04] overflow-hidden">
            {/* left glow bar */}
            <motion.div
              className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-xl"
              animate={{ boxShadow: ['0 0 8px rgba(0,230,118,0.4)', '0 0 22px rgba(0,230,118,0.8)', '0 0 8px rgba(0,230,118,0.4)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="pl-6 pr-5 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <p className="text-primary text-[10px] font-black tracking-[0.2em] uppercase">Live · How to Board</p>
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  RIT Transport operates <span className="text-primary font-semibold">51 buses</span> across
                  Chennai daily. Board from your nearest RIT stop — check the route map and contact
                  the incharge below for stop locations near you.
                </p>
              </div>
              <a
                href="https://www.rittransport.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 shrink-0 px-5 py-2.5 border border-primary/40 bg-primary/10
                           text-primary text-xs font-black tracking-widest uppercase rounded-lg
                           hover:bg-primary hover:text-black hover:border-primary
                           transition-all duration-300 shadow-[0_0_14px_rgba(0,230,118,0.1)]"
              >
                RIT Transport
                <ExternalLinkIcon />
              </a>
            </div>
          </div>
        </FadeUp>

        {/* ── Route Cards ── */}
        <FadeUp delay={0.15} className="mb-14">
          <p className="text-primary/70 text-[11px] font-black tracking-[0.22em] uppercase mb-5 flex items-center gap-2">
            <MapPinIcon />
            Available Pickup Areas
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {routes.map((route, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="relative flex flex-col items-center justify-center py-5 px-3 rounded-xl
                           border border-white/6 bg-black/30 cursor-default text-center group overflow-hidden"
              >
                {/* hover glow bg */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: 'radial-gradient(circle at 50% 60%,rgba(0,230,118,0.08),transparent 70%)' }}
                />
                {/* pulsing dot */}
                <div className="relative mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(0,230,118,0.8)]" />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: i * 0.25 }}
                  />
                </div>
                <p className="text-zinc-100 text-[13px] font-bold tracking-wide leading-tight relative z-10">
                  {route.area}
                </p>
                <p className="text-primary/60 text-[9px] mt-1 font-bold tracking-widest uppercase relative z-10">
                  Stop active
                </p>
                {/* border animate */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-primary/70
                                transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs mt-5 text-center">
            + many more routes across Chennai —&nbsp;
            <a href="https://www.rittransport.com/" target="_blank" rel="noopener noreferrer"
               className="text-primary/60 hover:text-primary underline underline-offset-2 transition-colors">
              rittransport.com
            </a>
          </p>
        </FadeUp>

        {/* ── Incharge Cards ── */}
        <FadeUp delay={0.2}>
          <p className="text-primary/70 text-[11px] font-black tracking-[0.22em] uppercase mb-5 flex items-center gap-2">
            <span className="text-primary"><UserIcon size={14} /></span>
            Transport Helpline
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            {incharges.map((person, i) => (
              <InchargeCard key={i} person={person} delay={i * 0.12} />
            ))}
          </div>
        </FadeUp>

        {/* ── Route Map CTA ── */}
        <FadeUp delay={0.25} className="mt-10 flex justify-center">
          <motion.a
            href="https://fit25.com/ritRouteMap/map00.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 py-3 border border-white/10 rounded-lg
                       text-zinc-400 text-xs font-bold tracking-widest uppercase
                       hover:border-primary/50 hover:text-primary hover:bg-primary/5
                       transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-primary/60 group-hover:text-primary transition-colors"><MapPinIcon /></span>
            View Full RIT Route Map
            <ExternalLinkIcon />
            {/* shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                             bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />
          </motion.a>
        </FadeUp>

      </div>
    </section>
  );
};

export default TransportSection;
