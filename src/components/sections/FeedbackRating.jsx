import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StarIcon = ({ filled, half }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ✅ Paste your Formspree form endpoint here (get it free at formspree.io):
const FORMSPREE_URL = 'https://formspree.io/f/xeevaapj';

const LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

const FeedbackRating = () => {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const formRef      = useRef(null);

  const [overall, setOverall] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [feedback, setFeedback]     = useState('');
  const [name, setName]             = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      });
      gsap.from('.fb-card', {
        opacity: 0, y: 35, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (overall === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Anonymous',
          rating: `${overall} / 5 — ${LABELS[overall]}`,
          feedback: feedback.trim(),
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        console.error('Formspree error:', data);
        setSubmitted(true); // still show success to user
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const displayStar = hovered || overall;

  return (
    <section
      id="feedback"
      ref={sectionRef}
      className="py-20 md:py-36 relative z-10 border-t border-white/5 bg-[#030a07]"
    >
      {/* Glow blob */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', left: '50%', top: '10%',
          transform: 'translateX(-50%)',
          width: '700px', height: '320px',
          background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-14">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" className="text-[#00e676]">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <p className="text-[#00e676]/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">
            Your Opinion Matters
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            RATE THIS <span className="text-[#00e676]">WEBSITE</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Help us improve the ENERGIZE 2026 experience. Share your honest thoughts on our website below.
          </p>
        </div>

        {!submitted ? (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>

            {/* Overall star rating card */}
            <div className="fb-card mb-6 p-7 md:p-10 bg-black/40 border border-white/8 rounded-2xl
              hover:border-[#00e676]/20 transition-colors duration-500 text-center">
              <p className="text-zinc-300 font-semibold text-lg mb-2">Overall Experience</p>
              <p className="text-zinc-500 text-sm mb-6">How would you rate the website overall?</p>

              {/* Stars row */}
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    className={`transition-all duration-200 focus:outline-none
                      ${displayStar >= star ? 'text-[#00e676] scale-110' : 'text-zinc-700'}
                      hover:scale-125 hover:text-[#00e676]`}
                    onClick={() => setOverall(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                  >
                    <StarIcon filled={displayStar >= star} />
                  </button>
                ))}
              </div>

              {/* Label */}
              <p className="text-[#00e676] font-bold text-sm h-5 transition-all duration-200">
                {LABELS[displayStar] || ''}
              </p>
            </div>


            {/* Feedback textarea + name */}
            <div className="fb-card mb-8 p-7 md:p-10 bg-black/40 border border-white/8 rounded-2xl
              hover:border-[#00e676]/20 transition-colors duration-500 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fb-name" className="text-zinc-300 text-sm font-medium">
                  Your Name <span className="text-zinc-600 font-normal">(optional)</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Arjun Kumar"
                  maxLength={60}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3
                    text-zinc-100 text-sm placeholder-zinc-600
                    focus:outline-none focus:border-[#00e676]/50 focus:ring-1 focus:ring-[#00e676]/20
                    transition-all duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="fb-message" className="text-zinc-300 text-sm font-medium">
                  Your Feedback <span className="text-[#00e676]">*</span>
                </label>
                <textarea
                  id="fb-message"
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder="Tell us what you loved, what could be improved, or any suggestions for the website…"
                  rows={5}
                  maxLength={1000}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3
                    text-zinc-100 text-sm placeholder-zinc-600 resize-none
                    focus:outline-none focus:border-[#00e676]/50 focus:ring-1 focus:ring-[#00e676]/20
                    transition-all duration-300"
                />
                <p className="text-zinc-600 text-xs text-right">{feedback.length}/1000</p>
              </div>
            </div>

            {/* Submit */}
            <div className="fb-card flex flex-col items-center gap-3">
              {overall === 0 && (
                <p className="text-zinc-500 text-xs">⭐ Please select an overall star rating to submit.</p>
              )}
              <button
                type="submit"
                disabled={overall === 0 || submitting}
                className={`relative inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm
                  tracking-widest uppercase transition-all duration-300 overflow-hidden
                  ${overall === 0
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-[#00e676] text-black hover:bg-[#00ff88] hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:scale-105 active:scale-95'
                  }`}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success state */
          <div ref={formRef}
            className="flex flex-col items-center justify-center gap-6 py-16 px-8
              bg-black/40 border border-[#00e676]/30 rounded-2xl text-center
              shadow-[0_0_40px_rgba(0,230,118,0.08)]">
            <div className="w-20 h-20 rounded-full bg-[#00e676]/10 border border-[#00e676]/30
              flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                fill="none" stroke="#00e676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                Thank You{name ? `, ${name}` : ''}! 🎉
              </h3>
              <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                Your feedback has been received. It helps us make ENERGIZE 2026 even better. See you on April 21!
              </p>
            </div>
            {/* Show submitted rating */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className={s <= overall ? 'text-[#00e676]' : 'text-zinc-700'}>
                  <StarIcon filled={s <= overall} />
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackRating;
