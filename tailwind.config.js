/** @type {import('tailwindcss').Config} */
const { platformSelect } = require('nativewind/theme');

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sans: platformSelect({
          android: 'Karla',
          ios: 'Karla',
          web: '"Karla", ui-sans-serif, system-ui',
        }),
      },
      colors: {
        'off-white': '#E3E3E3',
        dark: '#1C1C1E',
        'soft-dark': '#2A2A2F',
      },
    },
  },
  nativewind: {
    inlineNativeRem: 16,
  },
  plugins: [],
};