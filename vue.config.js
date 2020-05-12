const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  publicPath: "/", // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  lintOnSave: false,
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias.set("@$", resolve("src"));
  },
  devServer: {
    public: "192.168.0.156:8080",
    hot: true,
    disableHostCheck: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target:
          "https://www.fastmock.site/mock/53df7119c852e65d94f26a08478f75e4/api",
        changeOrigin: true,
        secure: false
      }
    }
  }
};
