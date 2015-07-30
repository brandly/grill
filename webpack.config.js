var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer-core')

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
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ],
  postcss: function () {
    return [autoprefixer()]
  }
}
