import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TeamSection = () => {
  const sectionRef = useRef(null);

  const organizers = [
    { badge: 'COMMUNITY HEAD', name: 'MR. C. OBED OTTO', role: 'Dean - SCOFT (ICT)', contact: '+91 0000000000', link: '#' },
    { badge: 'FACULTY COORDINATOR', name: 'MS. AKILA MOHAN', role: 'Overall Faculty Coordinator', contact: '+91 0000000000', link: '#' },
    { badge: 'COORDINATOR', name: 'KARNALA SANTHAN KUMAR', role: 'Event Coordinator', contact: '+91 0000000000', link: '#' },
    { badge: 'ASST. COORDINATOR', name: 'S MOHAMED AHSAN', role: 'Assistant Coordinator', contact: '+91 9884261429', link: '#' },
    { badge: 'ASST. COORDINATOR', name: 'JAI SURYA R', role: 'Assistant Coordinator', contact: '+91 9600971344', link: '#' },
    { badge: 'ASST. COORDINATOR', name: 'ABISHAI K C', role: 'Assistant Coordinator', contact: '+91 8667331224', link: '#' },
  ];

  useEffect(() => {
    // GSAP animations removed to ensure cards remain perfectly aligned 
    // and maintain exact 100% transparency uniform with the background at all times.
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-start gap-6 mb-16">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50">
            <UsersIcon />
          </div>
          <div className="text-left">
            <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">LEADERSHIP</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
              CENTRAL <span className="text-primary">TEAM</span>
            </h2>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizers.map((person, i) => (
            <div 
              key={i} 
              className="team-card bg-transparent border border-white/5 p-8 rounded-sm hover:border-white/10 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.1em] uppercase shadow-[0_0_10px_rgba(250,204,21,0.05)]">
                  {person.badge}
                </div>
                <a 
                  href={person.link} 
                  className="p-1.5 border border-white/10 rounded border-primary/20 text-primary/70 group-hover:text-primary transition-colors hover:bg-primary/5"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon />
                </a>
              </div>
              
              <div className="text-left mb-6">
                <h3 className="text-lg font-display font-black text-primary text-glow mb-2">{person.name}</h3>
                <p className="text-zinc-300 text-sm tracking-wide">{person.role}</p>
              </div>

              <div className="text-left mt-auto">
                <p className="text-primary/70 text-[10px] font-black tracking-[0.15em] mb-1 uppercase">CONTACT</p>
                <p className="text-zinc-300 text-[13px] font-mono font-medium tracking-wider">{person.contact}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
