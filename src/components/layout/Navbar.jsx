import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../../assets/hayden-folker-cloud-nine.mp3';
import useRegistrationStatus from '../../hooks/useRegistrationStatus';

import ritLogo from '../../assets/rit-logo.png';
import ieteLogo from '../../assets/iete-logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);
  const soundOnRef = useRef(true); // mirror of soundOn for async callbacks
  const { isClosed, timeLeft, registrationUrl, statusText } = useRegistrationStatus();

  // Initialize audio and autoplay using muted trick
  // (browsers allow muted autoplay; we unmute immediately after)
  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 0.8;
    audio.currentTime = 35;
    audio.muted = true; // must start muted for autoplay to be allowed
    audioRef.current = audio;

    audio.play()
      .then(() => {
        // Playback started — unmute right away
        audio.muted = false;
      })
      .catch(() => {
        // Even muted autoplay blocked (rare); fall back to interaction unlock
        const unlock = () => {
          audio.muted = false;
          audio.play().catch(() => { });
          document.removeEventListener('click', unlock);
          document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('click', unlock);
        document.addEventListener('keydown', unlock);
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    soundOnRef.current = soundOn;
  }, [soundOn]);

  // Play / pause based on soundOn toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.muted = false;
      audio.play().catch(() => { });
    } else {
      audio.pause();
    }
  }, [soundOn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href.startsWith('/')) {
      window.location.href = href;
      setMobileMenuOpen(false);
      return;
    }

    if (window.location.pathname !== '/') {
      window.location.href = `/${href}`;
      setMobileMenuOpen(false);
      return;
    }

    const target = document.querySelector(href);
    if (target && window.lenis) {
      window.lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'TRACKS', href: '#tracks' },
    { name: 'SCHEDULE', href: '#schedule' },
    { name: 'PRIZES', href: '#prizes' },
    { name: 'FAQS', href: '#faqs' },
    { name: 'BLOG', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'bg-background/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3 relative z-50 shrink-0">
            <div className="flex items-center gap-2">
              <img src={ritLogo} alt="RIT Logo" className="h-8 sm:h-9 md:h-10 w-auto object-contain" />
            </div>
            <div className="h-7 w-px bg-white/10 hidden md:block"></div>
            <a href="#" className="font-display font-black text-base sm:text-lg md:text-xl tracking-tighter text-white flex items-center gap-1 md:gap-2 group">
              <span className="text-primary group-hover:text-glow transition-all duration-300">⚡ ENERGIZE</span>
              <span className="text-accent text-xs md:text-sm font-bold tracking-wider hidden sm:inline-block">2026</span>
              <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse-slow hidden sm:block"></div>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[10px] lg:text-xs font-bold tracking-[0.12em] lg:tracking-widest text-zinc-400 hover:text-primary transition-colors relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3 relative z-50">
            <img src={ieteLogo} alt="IETE Logo" className="h-7 min-[400px]:h-9 sm:h-10 md:h-11 w-auto object-contain brightness-0 invert" />
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>

            <button
              onClick={() => setSoundOn(!soundOn)}
              className="p-1.5 text-zinc-400 hover:text-primary transition-colors border border-white/10 rounded-full hover:border-primary w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden xl:block px-4 py-2 ${isClosed ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-primary text-black'} font-bold text-xs hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wide text-center whitespace-nowrap`}
            >
              {isClosed ? statusText : `${statusText} (${timeLeft})`}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay - OUTSIDE header to prevent bounding box issues */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 flex flex-col px-6 pt-28 pb-10 md:hidden"
          >
            <div className="flex flex-col gap-6 flex-1 mt-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="text-3xl font-display font-black tracking-tighter text-zinc-300 hover:text-white flex items-center justify-between group border-b border-white/5 pb-4"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-8 pb-8"
            >


              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Quick Action</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-xs text-primary/80 uppercase tracking-widest">Live</span>
                </div>
              </div>
              <a
                href={registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center px-8 py-5 ${isClosed ? 'bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-black' : 'bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-black'} font-bold text-lg transition-all rounded-sm active:scale-[0.98] block uppercase tracking-widest`}
              >
                {isClosed ? statusText : `${statusText} (${timeLeft})`}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
