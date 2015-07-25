var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /src.*\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
