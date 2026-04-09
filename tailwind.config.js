/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2a4a73',
          dark: '#152a45',
        },
        gold: {
          DEFAULT: '#f4a261',
          light: '#f7b87a',
          dark: '#e8924d',
        }
      },
      fontFamily: {
        'be-vietnam': ['"Be Vietnam Pro"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};