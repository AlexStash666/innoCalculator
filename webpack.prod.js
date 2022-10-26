const { resolve } = require('path')
const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/showcase-bundle', to: 'showcase-bundle' }]
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        exclude: /showcase-bundle/
      })
    ]
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, './build'),
    publicPath: '/',
    clean: true
  }
})
