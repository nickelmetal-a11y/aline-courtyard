/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#faf8f3',
          500: '#d4af37',
          600: '#c29c1f',
          700: '#9f7c1f',
        },
      },
    },
  },
  plugins: [],
};
