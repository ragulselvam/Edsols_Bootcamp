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
        edsols: {
          rose: '#e11d48',
          'rose-dark': '#be123c',
          'rose-light': '#f43f5e',
          'rose-subtle': '#ffe4e6',
          navy: '#0f172a',
          'navy-dark': '#090e1a',
          'navy-light': '#1e293b',
          blue: '#e11d48',
          'blue-dark': '#be123c',
          'blue-light': '#f43f5e',
          cyan: '#e11d48',
          'cyan-light': '#f43f5e',
          emerald: '#10b981',
          'emerald-dark': '#059669',
          pink: '#e11d48',
          violet: '#be123c',
          purple: '#9f1239',
        },
        surface: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
          600: '#64748b',
          700: '#475569',
          800: '#334155',
          900: '#1e293b',
          950: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'edsols-hero': 'linear-gradient(135deg, #fff1f2 0%, #ffffff 40%, #f8fafc 100%)',
        'edsols-cta': 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
        'edsols-accent': 'linear-gradient(135deg, #e11d48 0%, #0f172a 100%)',
      },
      boxShadow: {
        'edsols-card': '0 1px 3px rgba(15, 23, 42, 0.06), 0 4px 16px rgba(15, 23, 42, 0.04)',
        'edsols-hover': '0 4px 12px rgba(225, 29, 72, 0.12), 0 8px 32px rgba(225, 29, 72, 0.08)',
        'glow-blue': '0 0 25px -5px rgba(225, 29, 72, 0.35)',
        'glow-cyan': '0 0 25px -5px rgba(225, 29, 72, 0.35)',
        'glow-rose': '0 0 25px -5px rgba(225, 29, 72, 0.35)',
        'glow-emerald': '0 0 20px -4px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'glow-line': 'glowLine 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowLine: {
          '0%, 100%': { opacity: '0.3', transform: 'translateX(-100%)' },
          '50%': { opacity: '1', transform: 'translateX(100%)' },
        },
      }
    },
  },
  plugins: [],
}
