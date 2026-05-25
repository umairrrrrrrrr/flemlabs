/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        cream: {
          light: '#E1E0CC',
          DEFAULT: '#DEDBC8',
          dark: '#B5B2A1',
        },
        surface: {
          dark: '#101010',
          light: '#212121',
        }
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
      },
      animation: {
        'noise-grain': 'noise 0.5s steps(10) infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 11%)' },
          '60%': { transform: 'translate(15%, -5%)' },
          '75%': { transform: 'translate(-10%, -25%)' },
          '85%': { transform: 'translate(15%, 15%)' },
          '95%': { transform: 'translate(5%, -10%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', filter: 'drop-shadow(0 0 2px rgba(222, 219, 200, 0.2))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 12px rgba(222, 219, 200, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
