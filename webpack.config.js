const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = require('./config').rootDir;

module.exports = {
  mode: "production",
  entry: "./src/client/index.jsx",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "script.min.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: { extensions: [".js", ".jsx"] },
        loader: "babel-loader",
        options: {
          presets: ["env", "react"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=.+)?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  watch: false,   // true to enable file watching on prod mode
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    historyApiFallback: true,
    port: 8000,
    proxy: {
      '/': 'http://localhost'   // reverse proxied by nginx
    },
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
}