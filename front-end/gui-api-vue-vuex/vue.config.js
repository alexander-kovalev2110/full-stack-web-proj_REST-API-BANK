
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  pwa: {
    name: 'My App',
    shortname: 'App',
    themeColor: '#4DBA87',
    start_url: '.',
    displY: 'standalone',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',


    }
  }
)
