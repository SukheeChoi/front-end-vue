const path = require('path');
const webpack = require('webpack');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_SERVER_PORT,
    https: false,
    overlay: false,
    disableHostCheck: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@@': path.resolve(__dirname, 'src/app/'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __INTLIFY_PROD_DEVTOOLS__: false,
        __VUE_I18N_FULL_INSTALL__: true,
        __VUE_I18N_LEGACY_API__: true,
      }),
    ],
    devtool: 'source-map',
  },
  css: {
    extract: true,
    sourceMap: true,
  },
  runtimeCompiler: true,
};
