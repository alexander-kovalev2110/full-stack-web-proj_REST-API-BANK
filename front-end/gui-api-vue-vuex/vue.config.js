
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
    pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    appleMobileWebAppCapable: 'no',
    manifestOptions: {
      icons: [] // отключает генерацию иконок
    },
    workboxOptions: {
      skipWaiting: true,
    },
    injectManifest: false // не встраивать PWA в сборку
  }
  }
)
