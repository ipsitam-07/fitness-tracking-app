/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#13ec80',
        'primary-dark': '#10bd68',
        'bg-light': '#f6f8f7',
        'bg-dark': '#102219',
        'text-dark': '#111814',
        'text-light': '#618975',
        'border-color': '#dbe6e0',
      },
      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
