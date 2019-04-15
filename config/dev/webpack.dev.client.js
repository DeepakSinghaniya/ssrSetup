const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.dev.base.js');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;


const config = {
  bail: true,
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: path.join(__dirname, '/../../src/client/client.js'),
  output: {
    filename: 'js/bundle.js',
    path: path.join(__dirname, '/../../public')
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 300000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 1,
      maxInitialRequests: 10,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: false,
        default: false
      }
    }
  },
  "plugins": [
    new ReactLoadablePlugin({
      filename: path.join(__dirname, '/../../public/js/react-loadable.json'),
    }),
  ]
};

module.exports = merge(baseConfig, config);