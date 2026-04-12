import React, { Suspense, lazy } from 'react';
import Hero from '../components/sections/Hero';
import Mission from '../components/sections/Mission';

const Domains = lazy(() => import('../components/sections/Domains'));
const ProblemStatements = lazy(() => import('../components/sections/ProblemStatements'));
const TimelineSection = lazy(() => import('../components/sections/TimelineSection'));
const Rewards = lazy(() => import('../components/sections/Rewards'));
const SponsorsSection = lazy(() => import('../components/sections/SponsorsSection'));
const GallerySection = lazy(() => import('../components/sections/GallerySection'));
const TeamSection = lazy(() => import('../components/sections/TeamSection'));
const FAQSection = lazy(() => import('../components/sections/FAQSection'));
const TransportSection = lazy(() => import('../components/sections/TransportSection'));

const Home = () => {
  return (
    <main className="relative z-10 flex flex-col w-full">
      <Hero />
      <Mission />
      <Suspense fallback={<div className="h-20 w-full flex items-center justify-center opacity-50"><span className="animate-pulse">Loading...</span></div>}>
        <Domains />
        <ProblemStatements />
        <TimelineSection />
        <Rewards />
        <SponsorsSection />
        <GallerySection />
        <FAQSection />
        <TransportSection />
        <TeamSection />
      </Suspense>
    </main>
  );
};

export default Home;
