const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({

  transpileDependencies: [
    'vuetify'
  ],

  publicPath: process.env.NODE_ENV === 'production'
      ? '/Aeroplane-Chess/'
      : '/',

  outputDir: path.resolve(__dirname + "../docs")
})
