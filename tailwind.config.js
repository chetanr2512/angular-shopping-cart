/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
      primary: {
          50:  '#f2fdf6',
          100: '#d9fbe7',
          200: '#b3f6d2',
          300: '#7eeeb3',
          400: '#3fd18c',
          500: '#16a34a',
          600: '#138039',
          700: '#0f5f2c',
          800: '#0a4220',
          900: '#062816',
          950: '#02140b',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
}

