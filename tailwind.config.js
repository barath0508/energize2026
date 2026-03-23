/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808', // Deep Black/Dark Charcoal
        surface: '#111111',
        primary: {
          DEFAULT: '#facc15', // Gold/Yellow
          dark: '#eab308',
          glow: 'rgba(250, 204, 21, 0.5)'
        },
        muted: '#52525B', // Zinc 600
        carbon: '#18181b', // Zinc 900
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'], // For big headings
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Assuming double content for seamless loop
        }
      }
    },
  },
  plugins: [],
}
