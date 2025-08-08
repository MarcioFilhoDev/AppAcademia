/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/screens/**/*', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
