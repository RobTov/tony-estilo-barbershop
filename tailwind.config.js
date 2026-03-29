/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        secondary: '#1A1A1A',
        accent: '#ED0000',
        'text-light': '#F5F5F5',
        'text-muted': '#888888',
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
