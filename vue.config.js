const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  // 是否保存时开启eslint
  lintOnSave: undefined,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      createThemeColorReplacerPlugin()
    ]
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src'))
    // 保存自动修复eslint错误
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap((options) => {
        options.fix = true
        return options
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // "primary-color": "#1DA57A",
            // "link-color": "#1DA57A",
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    port: '8080',
    hot: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'https://www.fastmock.site/mock/53df7119c852e65d94f26a08478f75e4/api',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
