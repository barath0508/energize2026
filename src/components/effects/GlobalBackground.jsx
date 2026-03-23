import React from 'react';

const GlobalBackground = () => {
  return (
    <>
      {/* Optimized Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(250,204,21,0.05)_0%,_transparent_60%)]"></div>
      
      {/* Hardware-accelerated Marquee Text */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0 z-0 pointer-events-none overflow-hidden opacity-[0.03] select-none flex will-change-transform">
        <div className="whitespace-nowrap flex font-display font-black text-[15vw] tracking-tighter text-white animate-marquee leading-none pb-4" style={{ width: 'max-content' }}>
          <span className="px-8">JUSTICE</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>VENGEANCE</span>
          <span className="px-8">KNIGHT</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>HUSTLE</span>
          {/* Duplicate for seamless loop */}
          <span className="px-8">JUSTICE</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>VENGEANCE</span>
          <span className="px-8">KNIGHT</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>HUSTLE</span>
        </div>
      </div>
    </>
  );
};

export default GlobalBackground;
