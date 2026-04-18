import { useState, useEffect } from 'react';

const DEADLINE = new Date('2026-04-18T18:00:00+05:30').getTime();
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScd9mlrHgtLlPomwl2ZMR5_Z_2dZ_l1Q0fLmCFTUaien1K-lg/viewform?usp=sharing&ouid=100778809720239551618";
const INSTAGRAM_URL = "https://www.instagram.com/rit_iete_official/";

export const useRegistrationStatus = () => {
  const [timeLeftMs, setTimeLeftMs] = useState(DEADLINE - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = DEADLINE - now;
      setTimeLeftMs(remaining);
      
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isClosed = timeLeftMs <= 0;

  const formatTime = (ms) => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [hours, minutes, seconds]
      .map(v => v < 10 ? `0${v}` : v)
      .join(":");
  };

  return {
    isClosed,
    timeLeft: formatTime(timeLeftMs),
    registrationUrl: isClosed ? INSTAGRAM_URL : FORM_URL,
    statusText: isClosed ? "Follow us for more events" : "Register Now"
  };
};

export default useRegistrationStatus;
