import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'Who can participate?', a: 'Any student or professional with a passion for coding. Teams can be 1-4 members.' },
    { q: 'Is there a registration fee?', a: 'No, registration is completely free. We provide food, drinks, and swag for all participants.' },
    { q: 'Do I need to know how to code?', a: 'While helpful, it is not strictly required. Designers and product managers are welcome to join teams and contribute.' },
    { q: 'Will this be in-person or online?', a: 'Hack Hustle Code Knight is an exclusive in-person event.' },
    { q: 'Can I start working on my hack before the event?', a: 'No, all code and design elements must be created during the official hackathon hacking period to ensure fairness.' },
    { q: 'What do I need to bring?', a: 'Bring your laptop, charger, a valid ID, and a sleeping bag if you plan to stay overnight. We provide the rest!' },
    { q: 'Who owns the intellectual property of my project?', a: 'You and your team own 100% of the IP for anything you build during the hackathon.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0, 
        x: -30, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 85%' 
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faqs" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-12 text-center">
          INTELLIGENCE <br/> <span className="text-primary text-glow text-transparent" style={{WebkitTextStroke: '1px #facc15'}}>BRIEFING (FAQ)</span>
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`faq-item border ${openIndex === i ? 'border-primary shadow-[0_0_15px_rgba(250,204,21,0.1)]' : 'border-white/10'} bg-carbon rounded-lg overflow-hidden transition-all duration-300`}
            >
              <button 
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className={`font-display font-bold text-lg ${openIndex === i ? 'text-primary' : 'text-white'}`}>{faq.q}</span>
                <ChevronDown className={`transform transition-transform ${openIndex === i ? 'rotate-180 text-primary' : 'text-zinc-500'}`} />
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIndex === i ? '200px' : '0', opacity: openIndex === i ? 1 : 0 }}
              >
                <p className="p-6 pt-0 text-zinc-400">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
