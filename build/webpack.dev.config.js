var path = require('path')
var webpack = require('webpack')
var nodemodulesPath = path.resolve(__dirname, '../node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  //压缩打包的文件
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      //supresses warnings, usually from module minification
      warnings: false
    }
  }),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(), // 居然多个r http://webpack.github.io/docs/list-of-plugins.html
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, '../template/index.html'),
    inject: true
  })
];

// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = './build/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
})

module.exports = config;

let a = {
  entry: [
    'webpack-hot-middleware/client',
      './src/main.js'
    ],
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: "/",
    // publicPath: "http://127.0.0.1:8080/cy/static/",
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        options: {
          // vue-loader options go here
        }
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
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    prot: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'template/index.html'),
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin(),//
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    //压缩打包的文件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin() // 居然多个r http://webpack.github.io/docs/list-of-plugins.html

  ],
  devtool: '#eval-source-map'
}

