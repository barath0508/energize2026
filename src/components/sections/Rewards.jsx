import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rewards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0, y: 150, scale: 0.9, duration: 1, stagger: 0.2, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="prizes" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/80">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-16">
          THE <span className="text-primary text-glow">BOUNTY</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 2nd Place */}
          <div ref={el => cardsRef.current[0] = el} className="md:mt-12 bg-carbon border border-white/10 p-8 rounded-t-xl hover:border-zinc-400 transition-colors relative group">
            <div className="text-2xl font-black text-zinc-400 mb-4 opacity-50 line-through">02</div>
            <h3 className="text-3xl font-display font-black text-white mb-2 group-hover:text-zinc-300">₹25,000</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Runner Up</p>
          </div>
          
          {/* 1st Place */}
          <div ref={el => cardsRef.current[1] = el} className="bg-gradient-to-b from-primary/20 to-carbon border border-primary p-10 rounded-t-xl border-glow relative transform hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              Grand Prize
            </div>
            <div className="text-4xl mt-4 mb-4 opacity-80 mix-blend-luminosity">👑</div>
            <h3 className="text-5xl font-display font-black text-primary mb-2 text-glow">₹50,000</h3>
            <p className="text-zinc-300 font-bold uppercase tracking-widest text-sm">Champion Knight</p>
          </div>

          {/* 3rd Place */}
          <div ref={el => cardsRef.current[2] = el} className="md:mt-16 bg-carbon border border-white/10 p-8 rounded-t-xl hover:border-amber-700 transition-colors relative group">
            <div className="text-2xl font-black text-amber-700 mb-4 opacity-50 line-through">03</div>
            <h3 className="text-3xl font-display font-black text-white mb-2 group-hover:text-amber-600">₹15,000</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Second Runner Up</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
