/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cyberpunk primary colors
        cyber: {
          dark: '#0a0e27',
          darker: '#050812',
          accent: '#00d9ff',
          accent2: '#ff006e',
          accent3: '#8338ec',
          accent4: '#ffbe0b',
          surface: '#1a1f3a',
          surface2: '#252d48',
          text: '#e0e0ff',
          text2: '#a0a0c0',
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00d9ff 0%, #8338ec 100%)',
        'gradient-accent2': 'linear-gradient(135deg, #ff006e 0%, #ffbe0b 100%)',
        'gradient-accent3': 'linear-gradient(135deg, #8338ec 0%, #00d9ff 100%)',
        'gradient-neon': 'linear-gradient(90deg, #00d9ff 0%, #ff006e 50%, #8338ec 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 217, 255, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.3)',
        'glow-purple': '0 0 20px rgba(131, 56, 236, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 217, 255, 0.4)',
        'glow-pink-lg': '0 0 40px rgba(255, 0, 110, 0.4)',
      },
      borderColor: {
        cyber: {
          accent: '#00d9ff',
          accent2: '#ff006e',
          accent3: '#8338ec',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-flicker': 'glow-flicker 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(0, 217, 255, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
