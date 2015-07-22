module.exports = {
  entry: './src/js/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /src\/js.*\.js$/,
      loader: 'babel-loader'
    }]
  }
};
