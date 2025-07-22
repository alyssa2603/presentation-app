/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#005d9e',
        'primary-dark': '#004a7f',
        'primary-light': '#1a73b8',
      },
    },
  },
  plugins: [],
};
