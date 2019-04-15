const path = require('path');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.prod.base.js');

const config = {
    mode: 'production',
    target: 'node',
    entry: path.join(__dirname, '/../../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/../../server')
    },
    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);