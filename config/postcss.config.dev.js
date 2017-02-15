const autoprefixer = require('autoprefixer')
const cssnext = require('postcss-cssnext')

module.exports = {
  plugins: () => [
    cssnext({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ]
    })
  ]
}