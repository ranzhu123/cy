var path = require('path')
var webpack = require('webpack')
var nodemodulesPath = path.resolve(__dirname, './node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var projectRoot = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    'index':  path.resolve(__dirname, '../src/main.js'),
    vendors: [
      'Vue'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    publicPath: "static",
    // publicPath: "http://127.0.0.1:8080/cy/static/",
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    preloaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: projectRoot,
      //   exclude: /node_modules/
      // },
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {//限制大小小于10k的
        test:/\.png$/,loader:'url-loader?limit=10000'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: nodemodulesPath
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  devtool: '#eval-source-map'
}
