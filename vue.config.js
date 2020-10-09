const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')
const resolve = (dir) => path.join(__dirname, dir)



// 外部引入的cdn
const cdn = {
  css: [],
  js: [
    'https://unpkg.com/pikaz-excel-js',
    'https://unpkg.com/viser-vue/umd/viser-vue.min.js',
    'https://unpkg.com/@antv/data-set@0.11.7/build/data-set.js'
  ]
}

const externals = {
  'pikaz-xlsx-style': 'XLSX',
  'viser-vue': 'Viser',
  '@antv/data-set': 'DataSet'
}
module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  // 是否保存时开启eslint
  lintOnSave: undefined,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'exploit') {
      return {
        externals: externals
      }
    }
    return  {
      plugins:[
        // Ignore all locale files of moment.js
        createThemeColorReplacerPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      ]
    }
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
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              return `chunk.${packageName.replace('@', '')}`
            },
            priority: 10
          }
        }
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
