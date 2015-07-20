module.exports = {
  entry: './src/entry.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /src.*\.js$/,
      loader: 'babel-loader'
    }]
  }
};
