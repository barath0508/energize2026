import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Mission from './components/sections/Mission';
import GlobalBackground from './components/effects/GlobalBackground';

// Lazy load below-the-fold components to improve mobile INP and Hydration
const Domains = lazy(() => import('./components/sections/Domains'));
const TimelineSection = lazy(() => import('./components/sections/TimelineSection'));
const Rewards = lazy(() => import('./components/sections/Rewards'));
const SponsorsSection = lazy(() => import('./components/sections/SponsorsSection'));
const GallerySection = lazy(() => import('./components/sections/GallerySection'));
const TeamSection = lazy(() => import('./components/sections/TeamSection'));
const FAQSection = lazy(() => import('./components/sections/FAQSection'));
const Footer = lazy(() => import('./components/layout/Footer'));
const FloatingMap = lazy(() => import('./components/layout/FloatingCalendar'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-zinc-100 overflow-x-hidden relative">
      <GlobalBackground />
      <Navbar />
      
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <Mission />
        <Suspense fallback={<div className="h-20 w-full flex items-center justify-center opacity-50"><span className="animate-pulse">Loading...</span></div>}>
          <Domains />
          <TimelineSection />
          <Rewards />
          <SponsorsSection />
          <GallerySection />
          <FAQSection />
          <TeamSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
        <FloatingMap />
      </Suspense>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
