/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sophisto': ['Sophisto Expert', 'Arial', 'sans-serif'],
      },
      colors: {
        'primary': '#ffffff',
        'secondary': '#999999',
        'dark': '#121212',
        'darker': '#000000',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
} 