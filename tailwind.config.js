/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        primary: {
          DEFAULT: '#facc15',
          dark: '#eab308',
          glow: 'rgba(250, 204, 21, 0.5)'
        },
        muted: '#52525B',
        carbon: '#18181b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.8s steps(10) infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'node-pulse': 'node-pulse 2s ease-out infinite',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
        'marquee-reverse': 'marquee-scroll-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
