const { defineConfig } = require('@vue/cli-service')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = defineConfig({
  // devServer: {
  //   port: 5000,
  //   proxy: {
  //     '/api':{
  //       target:`http://localhost:5000`, //请求后台接口
  //       changeOrigin:true, // 允许跨域
  //       pathRewrite:{
  //           '^/api' : '' // 重写请求
  //       }
  //   }
  //   }
  // },


  transpileDependencies: true,
  lintOnSave: false,
  
})

 