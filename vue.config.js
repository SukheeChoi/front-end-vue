const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8000,
    https: false,
    overlay: false,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/'),
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
