/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#141414',
        accent: '#7C1125',
        'brand-blue': '#0A2447',
        'text-light': '#FFFFFF',
        'text-muted': '#9CA3AF',
        'border-subtle': '#2A2A2A',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
