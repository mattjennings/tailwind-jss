module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  babel: {
    plugins: ['tailwind-jss'],
  },
}
