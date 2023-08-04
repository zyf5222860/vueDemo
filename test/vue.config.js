const { defineConfig } = require('@vue/cli-service')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  
})
