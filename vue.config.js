const path = require('path')
const webpack = require('webpack')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const { getThemeColors, modifyVars } = require('./src/utils/themeUtil')
const { resolveCss } = require('./src/utils/theme-color-replacer-extend')
const resolvecore = (dir) => path.join(__dirname, dir)

// 外部引入的cdn
const cdn = {
  css: [],
  js: []
}
const externals = {}
module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  // 是否保存时开启eslint
  lintOnSave: undefined,
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [path.resolve(__dirname, './src/theme/theme.less')]
  //   }
  // },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'exploit') {
      return {
        externals: externals,
        plugins: [
          new ThemeColorReplacer({
            fileName: 'css/theme-colors-[contenthash:8].css',
            matchColors: getThemeColors(),
            injectCss: true,
            resolveCss
          })
        ]
      }
    }
    // config.entry.app = ['babel-polyfill', 'whatwg-fetch', './src/main.js']
    config.performance = {
      hints: false
    }
    config.plugins.push(
      new ThemeColorReplacer({
        fileName: 'css/theme-colors-[contenthash:8].css',
        matchColors: getThemeColors(),
        injectCss: true,
        resolveCss
      })
    )
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set('@', resolvecore('src'))
    // 分模块打包
    config.optimization.splitChunks({
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 300000, // 依赖包超过300000bit将被单独打包
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `chunk.${packageName.replace('@', '')}`
          },
          priority: 10
        }
      }
    })
    // 生产环境下关闭css压缩的 colormin 项，因为此项优化与主题色替换功能冲突
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'exploit') {
      config.plugin('optimize-css').tap((args) => {
        args[0].cssnanoOptions.preset[1].colormin = false
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: modifyVars(),
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
