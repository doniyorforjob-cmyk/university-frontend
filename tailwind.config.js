/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D47A1', // To'q ko'k
        secondary: '#1976D2', // O'rtacha ko'k
        accent: '#FF5722', // Sariq/Zarg'aldoq
        'text-main': '#212121', // To'q kulrang
        'text-light': '#757575', // Ochroq kulrang
        background: '#F5F5F5', // Fon uchun och kulrang
        danger: '#D32F2F', // Qizil
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // Changed to Inter
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
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};