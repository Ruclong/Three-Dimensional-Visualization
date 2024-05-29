const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      // 配置跨域
      "/api": { // url识别符
        target: process.env.VUE_APP_URL, // server地址
        changeOrigin: true, // 允许跨域
        credentials: true, // 确保能够发送cookies
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('csv')
      .test(/\.csv$/)
      .use('csv-loader')
      .loader('csv-loader')
      .options({
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      })
      .end();
  }
});
