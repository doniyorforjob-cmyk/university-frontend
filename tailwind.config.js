// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1400px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1350px',
      '2xl': '1536px',
    },
    extend: {
      // === RANG PALITRASI ===
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: '#f8f6f4',
          100: '#f0ede9',
          200: '#e1dad3',
          300: '#d2c7bd',
          400: '#c3b4a7',
          500: '#F3E2A5',
          600: '#ab926f',
          700: '#988057',
          800: '#856d3f',
          900: '#725a27',
        },
        'navbar-dropdown': {
          DEFAULT: "hsl(var(--navbar-dropdown-bg))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: '#EAEEF5',
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'card-title': '#ffffff',
        'primary-dark': '#1e3a8a',
        'text-main': '#1f2937',
        'text-light': '#6b7280',
        danger: '#dc2626',
      },

      // === TIPOGRAFIYA ===
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography scale
        'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-3xl': 'clamp(2rem, 6vw, 3rem)',

        // Legacy fluid classes (keeping for compatibility)
        'fluid-h1': 'clamp(2rem, 5vw, 3rem)',
        'fluid-h2': 'clamp(1.5rem, 4vw, 2.25rem)',
        'fluid-h3': 'clamp(1.25rem, 3vw, 1.75rem)',
        'fluid-h4': 'clamp(1.125rem, 2.5vw, 1.5rem)',
        'fluid-p': 'clamp(1rem, 2.5vw, 1.125rem)',

        // Fixed sizes with line heights
        h1: ['2.5rem', { lineHeight: '3rem' }],
        h2: ['2rem', { lineHeight: '2.5rem' }],
        h3: ['1.75rem', { lineHeight: '2.25rem' }],
        h4: ['1.5rem', { lineHeight: '2rem' }],
        h5: ['1.25rem', { lineHeight: '1.75rem' }],
        h6: ['1.125rem', { lineHeight: '1.5rem' }],
        body: ['1rem', { lineHeight: '1.6' }],
        caption: ['0.875rem', { lineHeight: '1.4' }],
      },

      // === RAZMERLAR ===
      spacing: {
        // Fluid spacing scale
        'fluid-xs': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 2vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2.5vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 3rem)',
        'fluid-2xl': 'clamp(3rem, 5vw, 4rem)',

        // Fixed spacing (keeping for compatibility)
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
        '3xl': '6rem',
      },

      // === BO‘SHLIQ ===
      padding: {
        btn: '0.75rem 1.5rem',
        card: '1.5rem',
        input: '0.75rem 1rem',
      },

      // === RADIUS ===
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        none: '0',
        DEFAULT: '0.5rem',
        xl: '1.5rem',
        full: '9999px',
      },

      // === SHADOW ===
      boxShadow: {
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        md: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },

      // === ANIMATSIYALAR – YANGI: slide-in-bottom ===
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Navbar dropdown uchun – pastdan ko‘tarilib chiqadi
        "slide-in-bottom": "slideInFromBottom 0.25s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // YANGI: Dropdown oynasi pastdan ko‘tarilib chiqadi
        slideInFromBottom: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require("tailwindcss-animate"),
  ],
};