/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#05070e',
          surface: '#0b0f19',
          card: '#101726',
          border: '#1e293b',
          muted: '#1e2640',
        },
        electric: {
          400: '#38bdf8',
          500: '#00d2ff',
          600: '#0284c7',
          glow: 'rgba(0, 210, 255, 0.35)',
        },
        neon: {
          blue: '#00f0ff',
          cyan: '#00ffff',
          indigo: '#4f46e5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(0, 210, 255, 0.3)',
        'glow': '0 0 25px -2px rgba(0, 210, 255, 0.45)',
        'glow-lg': '0 0 50px -5px rgba(0, 210, 255, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}

