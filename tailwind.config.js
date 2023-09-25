/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        transparent : 'transparent',
        current : 'current',
        primary : '#5AE4A7',
        secondary : '#1A2D34' ,
        tertiary : '#457B9D',
        quaternary : '#F1FAEE',
        eight : '#1D3557',
        nine : '#DCF9E9',
        gunmetal : '1A2D34'
      },
      fontFamily : {
        montsserrat : ['Montserrat' , 'sans-serif'],
        poppins : ['Poppins' , 'sans-serif' ]
      }
    },
  },
  plugins: [],
}

