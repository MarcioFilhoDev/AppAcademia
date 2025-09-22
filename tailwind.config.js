/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#1D3557',
        accent: '#A8E6CF',
        lightGray: '#F0F0F0',
        gray: '#A0A0A0',
        dark: '#222222',
      },
    },
  },
  plugins: [],
};
