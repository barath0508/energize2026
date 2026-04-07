import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* Target: April 21, 2026 08:30 IST (UTC+5:30) */
const TARGET = new Date('2026-04-21T03:00:00.000Z');

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, over: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    over: false,
  };
}

/* Animated flip digit */
const Digit = ({ value, label, color = '#00e676' }) => {
  const prev = useRef(value);
  const changed = prev.current !== value;
  useEffect(() => { prev.current = value; });

  const padded = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Card */}
      <div
        className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-sm border border-white/8 bg-[#040c07] overflow-hidden flex items-center justify-center"
        style={{ boxShadow: `0 0 24px ${color}18, inset 0 1px 0 rgba(255,255,255,0.04)` }}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}90, transparent)` }} />

        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

        {/* Number */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={padded}
            className="absolute font-display font-black text-3xl sm:text-4xl md:text-5xl select-none"
            style={{ color }}
            initial={{ y: changed ? -36 : 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 36, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {padded}
          </motion.span>
        </AnimatePresence>

        {/* Bottom fold line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-black/50" />
      </div>

      {/* Label */}
      <span className="text-[9px] sm:text-[10px] font-black tracking-[0.2em] text-zinc-500 uppercase">{label}</span>
    </div>
  );
};

/* Blinking colon separator */
const Colon = () => (
  <motion.span
    className="text-white/20 font-black text-2xl sm:text-3xl md:text-4xl mb-5 select-none"
    animate={{ opacity: [1, 0.15, 1] }}
    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
  >
    :
  </motion.span>
);

const Countdown = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.over) {
    return (
      <motion.div
        className="inline-flex items-center gap-2 px-6 py-3 rounded-sm border border-primary/40 bg-primary/10 text-primary font-black text-sm tracking-widest uppercase mb-6"
        animate={{ boxShadow: ['0 0 0px rgba(0,230,118,0)', '0 0 30px rgba(0,230,118,0.4)', '0 0 0px rgba(0,230,118,0)'] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ⚡ Event is LIVE now!
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center gap-3 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
    >
      <p className="text-[10px] font-black tracking-[0.28em] text-zinc-600 uppercase">Event Starts In</p>
      <div className="flex items-end gap-2 sm:gap-3">
        <Digit value={time.days}    label="Days"    color="#00e676" />
        <Colon />
        <Digit value={time.hours}   label="Hours"   color="#00bcd4" />
        <Colon />
        <Digit value={time.minutes} label="Mins"    color="#a855f7" />
        <Colon />
        <Digit value={time.seconds} label="Secs"    color="#f97316" />
      </div>
    </motion.div>
  );
};

export default Countdown;
