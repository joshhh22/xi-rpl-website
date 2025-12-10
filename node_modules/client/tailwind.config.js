/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb', // boleh ganti ke #0066ff kalau mau
          soft: '#3b82f6'
        },
        background: {
          DEFAULT: '#0f1419',
          soft: '#1a1f2e'
        },
        card: {
          DEFAULT: '#1e2936',
          soft: '#242d3d'
        },
        text: {
          DEFAULT: '#e6edf3',
          muted: '#c9d1d9'
        },
        accent: {
          green: '#3fb950',
          purple: '#a371f7'
        },
        state: {
          error: '#f85149',
          warning: '#d29922'
        }
      },
      boxShadow: {
        'soft-card': '0 18px 45px rgba(15, 20, 25, 0.65)',
        'glow-blue': '0 0 24px rgba(37, 99, 235, 0.55)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem'
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'glow': 'glow 2.8s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite'
      }
    }
  },
  plugins: []
};
