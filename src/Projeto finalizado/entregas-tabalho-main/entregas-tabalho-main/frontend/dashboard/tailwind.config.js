/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ilonnacPink: '#E83E8C',
        ilonnacOrange: '#FF7A00',
      },
      backgroundImage: {
        'gradient-ilonnac': 'linear-gradient(90deg, #E83E8C 0%, #FF7A00 100%)',
      },
    },
  },
  plugins: [],
}
