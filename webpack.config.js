const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'indexBundle.js'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/], use: 'url-loader' },
      { test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/], use: 'file-loader' }
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}