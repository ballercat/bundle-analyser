module.exports = {
  context: __dirname + '/src',

  entry: {
    javascript: './index.js',
    html: './index.html'
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      }
    ]
  }
};

