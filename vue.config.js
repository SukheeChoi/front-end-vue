const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_SERVER_PORT,
    https: false,
    overlay: false,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@@': path.resolve(__dirname, 'src/app/'),
      },
    },
    devtool: 'source-map',
  },
  css: {
    extract: true,
    sourceMap: true,
  },
  runtimeCompiler: true,
};
