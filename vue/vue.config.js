const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkerPlugin = require('worker-plugin');

module.exports = {
  configureWebpack: function () {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new WorkerPlugin(),
          new CopyWebpackPlugin([{
            from: 'src/lib/abp.js',
            to: 'dist'
          }, {
            from: 'src/assets/',
            to: 'img'
          }
          ])
        ]
      }
    } else {
      return {
        devtool: 'source-map',
        plugins: [
          new WorkerPlugin(),
          new CopyWebpackPlugin([{
            from: 'src/lib/abp.js',
            to: 'dist'
          }, {
            from: 'src/assets/',
            to: 'img'
          }
          ])
        ]
      }
    }
  },
}