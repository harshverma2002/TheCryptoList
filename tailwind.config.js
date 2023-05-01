/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily:{
        robotoMono:["Roboto Mono"],
      },
      backgroundImage: {
        'home_bg': "url('./assets/homebg.jpg')",
        'coins_bg': "url('./assets/coinsbg.jpg')",
        'exchanges_bg': "url('./assets/exchangebg.jpg')",
      }
    },
  },
  plugins: [],
}

