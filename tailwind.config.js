/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5856d6',
        'primary-dark': '#4c46cf',
        'primary-light': '#6b64dd',
      },
    },
  },
  plugins: [],
};
