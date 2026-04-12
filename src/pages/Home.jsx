import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
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
    <>
      <Helmet>
        <title>ENERGIZE 2026 — Bridging Bytes & Bricks | IETE ISF, RIT</title>
        <meta name="description" content="ENERGIZE 2026 is a high-stakes on-spot hackathon by IETE Students' Forum at Rajalakshmi Institute of Technology, Chennai. Code meets carbon neutrality. April 21, 2026. Register now!" />
        <link rel="canonical" href="https://energize2026.vercel.app/" />
      </Helmet>
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
    </>
  );
};

export default Home;
