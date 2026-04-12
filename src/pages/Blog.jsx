import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  useEffect(() => {
    // Scroll to top on load since we are routing
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 flex flex-col w-full min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.article 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full space-y-12"
      >
        {/* Header Section */}
        <header className="space-y-6 border-b border-primary/20 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-body text-primary tracking-[0.3em] uppercase bg-primary/10 px-3 py-1 rounded-sm border border-primary/20">
              Event Details
            </span>
            <span className="text-xs font-body text-zinc-400 tracking-wider">
              April 21, 2026
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black leading-tight tracking-tighter text-white drop-shadow-lg">
            Inside <span className="text-primary">ENERGIZE 2026:</span><br />
            Bridging Bytes & Bricks
          </h1>
          <p className="text-lg sm:text-xl font-body text-zinc-300 leading-relaxed max-w-3xl">
            A high-stakes 24-hour innovation marathon where the digital meets the physical to forge carbon-neutral solutions for tomorrow.
          </p>
        </header>

        {/* Content Section */}
        <div className="prose prose-invert prose-lg max-w-none font-body space-y-8 text-zinc-300">
          
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display text-white border-l-4 border-primary pl-4 tracking-wide">The Vision: Code Meets Carbon Neutrality</h2>
            <p className="leading-relaxed">
              We stand at a critical juncture in human history. Technology is advancing at breakneck speed, yet our environment bears the cost. <strong>ENERGIZE 2026</strong> is the ultimate hackathon designed to flip the script. Hosted by the IETE Students' Forum at Rajalakshmi Institute of Technology, this event challenges developers, designers, and hardware architects to build sustainable operations without compromising on innovation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display text-white border-l-4 border-primary pl-4 tracking-wide">Dual Tracks: Software & Hardware</h2>
            <p className="leading-relaxed">
              Whether you are a machine learning geek or a microcontroller wizard, there is a battlefield tailored for your expertise:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-200">
              <li><strong className="text-primary">Software Track:</strong> Build scalable applications, optimized algorithms, and cloud solutions aimed at reducing digital carbon footprints, streamlining smart logistics, and promoting circular economies.</li>
              <li><strong className="text-primary">Hardware Track:</strong> Design physical prototypes ranging from IoT-enabled energy grids to autonomous environmental monitoring systems. If it has a circuit, we want to see it run efficiently.</li>
            </ul>
          </section>

          <section className="space-y-4 p-8 bg-black/40 border border-primary/20 relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl font-display text-primary tracking-wide relative z-10">What's on the Line?</h2>
            <p className="leading-relaxed relative z-10">
              Beyond the glory of securing the future, the stakes are very real:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-200 relative z-10">
              <li>Heavy cash prize pools distributed among tracks</li>
              <li>Sponsor-issued hardware kits and cloud credits</li>
              <li>Direct recruitment pipelines set up by industry leads</li>
              <li>The title of the <strong>Code Knight</strong>.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display text-white border-l-4 border-primary pl-4 tracking-wide">The Venue & Vibe</h2>
            <p className="leading-relaxed">
              The event is a grueling 24-hour sprint held on-spot. Expect intense coding sessions, mid-night energy drinks, and an immersive cyberpunk aesthetic that keeps the adrenaline pumping. Our mentors will be patrolling the arena to unblock your technical dead-ends, ensuring that the 24 hours result in a working, impactful prototype.
            </p>
          </section>

          <section className="pt-8 border-t border-primary/20 text-center">
            <h3 className="text-xl font-display text-white mb-6">Are you ready to secure the legacy?</h3>
            <a 
              href="https://forms.gle/w7JbV1KnatzMnVJs7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-black font-display font-bold tracking-[0.2em] transform hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_hsl(45_100%_50%_/_0.3)] hover:shadow-[0_0_30px_hsl(45_100%_50%_/_0.6)]"
            >
              SECURE YOUR SLOT
            </a>
          </section>

        </div>
      </motion.article>
    </main>
  );
};

export default Blog;
