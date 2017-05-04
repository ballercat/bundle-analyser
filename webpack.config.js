const path = require('path');

module.exports = {
  context: __dirname + '/src',

  devtool: 'source-map',

  entry: {
    javascript: './js/index.js',
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        query: { mimetype: "image/png" }
      }
    ]
  }
};

