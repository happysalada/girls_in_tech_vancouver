const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    'app': ['./js/app.js', './css/app.css']
  },
  mode: process.env.NODE_ENV,
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } }
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.css', {
      disable: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
}
