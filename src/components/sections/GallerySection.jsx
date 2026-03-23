import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  const images = [
    { src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800', alt: 'Cyberpunk desk setup with neon lighting' },
    { src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', alt: 'Computer screen with code in darkness' },
    { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', alt: 'Team collaborating late at night' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', alt: 'Glowing hardware setup' },
    { src: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800', alt: 'Monitor displaying dense code arrays' },
    { src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800', alt: 'Conceptual neon money and tech grid' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      imagesRef.current.forEach((img, i) => {
        gsap.from(img, {
          opacity: 0,
          y: i % 2 === 0 ? 50 : -50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-16">
          THE <span className="text-primary text-glow">ARCHIVES</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              ref={el => imagesRef.current[i] = el}
              className="relative overflow-hidden group aspect-video rounded-sm border border-white/10 hover:border-primary/80 transition-colors"
            >
              <div className="absolute inset-0 bg-primary mix-blend-color opacity-0 group-hover:opacity-20 transition-opacity z-10 pointer-events-none duration-500"></div>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <p className="text-left font-mono text-xs text-primary font-bold tracking-widest uppercase truncate">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
