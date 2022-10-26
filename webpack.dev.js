const { join } = require('path')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'augmented_content/**/*' }]
    }),
    new DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })'
    })
  ],
  optimization: {
    minimize: false
  },
  devServer: {
    port: process.env.PORT,
    static: join(__dirname, 'public'),
    hot: true,
    open: true,
    liveReload: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  output: {
    publicPath: '/'
  }
})
