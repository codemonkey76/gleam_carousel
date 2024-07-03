
module.exports = {
  content: ["./index.html", "./src/**/*.{gleam,mjs,css}"],
  theme: {
    extend: {
      fontFamily: {
        'display': 'Montserrat, ui-serif'
      },
      colors: {
        brand: {
          purple: '#80699D',
          black: '#252525',
        }
      }
    },
  },
  plugins: [],
};
