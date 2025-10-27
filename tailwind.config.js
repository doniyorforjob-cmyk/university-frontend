/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1500px',
      '2xl': '1600px',
    },
    extend: {
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          DEFAULT: "#1d4ed8",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          "950": "#172554"
        },
        'primary-dark': '#1a365d',
        secondary: '#1976D2',
        accent: '#FF5722',
        'text-main': '#212121',
        'text-light': '#757575',
        background: '#F5F5F5',
        danger: '#D32F2F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-fade': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '20%': { opacity: '1', transform: 'translateY(0)' },
          '80%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'slide-fade': 'slide-fade 4s ease-in-out forwards',
      },
      fontSize: {
        'fluid-h1': 'clamp(1.75rem, 4vw, 2.5rem)',
        'fluid-h2': 'clamp(1.5rem, 3vw, 2.125rem)',
        'fluid-h3': 'clamp(1.25rem, 2.5vw, 1.75rem)',
        'fluid-p': 'clamp(1.125rem, 2vw, 1.25rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};