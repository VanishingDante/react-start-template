const webpack = require('webpack')
const paths = require('./paths')
const postcssConfig = require('./postcss.config.dev')

module.exports = {
  entry: [
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'assets/js/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'eslint-loader' }],
        include: paths.appSrc,
        enforce: 'pre'
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
        include: paths.appSrc,
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: postcssConfig
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [{ loader: 'file-loader', options: { name: 'static/media/[name].[hash:8].[ext]' } }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-source-map'
}