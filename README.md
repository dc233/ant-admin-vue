

## 简介
ant-admin-vue是一个后台管理 spa 页面，它基于 [vue](https://github.com/vuejs/vue) 和 [Ant Design of Vue](https://www.antdv.com/docs/vue/introduce-cn/) 采用了最新的前端技术栈，实现了登录权限验证，动态路由生成，并使用 [fast-mock](https://www.fastmock.site/#/) 来模拟请求数据，实现了典型的业务模型案例，它可以帮你快速搭建后台管理系统模板，并根据实际的业务需求添加路由来实现企业级管理页面，相信本项目一定能帮助到你。

**目前版本基于  `webpack 4.0+` 和 `vue-cli 4.x ` 版本构建，需要 [Node.js](https://nodejs.org/) 8.9或更高版本（推荐8.11.0+），相关知识可以自行进官网进行了解**       
## 快速开始    
> 在开始之前，请确保在本地安装 node 和 webpack 及 git。 本项目涉及的技术栈主要有 [ES6](http://es6.ruanyifeng.com/) 、[vue](https://cn.vuejs.org/) 、[vuex](https://vuex.vuejs.org/zh/) 、[vue-router](https://router.vuejs.org/zh/) 、[vue-cli](https://cli.vuejs.org/zh/guide/) 、[axios](http://www.axios-js.com/) 、[webpack](https://www.webpackjs.com/) 、[Ant Design of Vue](https://www.antdv.com/docs/vue/introduce-cn/) 、[fast-mock](https://www.fastmock.site/#/) ,所以你最好提前熟悉了解这些知识，这将对你认识学习该项目有很大帮助

## 安装
```
# 克隆项目
git clone https://github.com/dc233/ant-admin-vue.git

# 进入项目目录
cd ant-admin-vue

# 安装依赖
npm install

# 启动服务
npm run serve
```

##目录结构
```
├── babel.config.js  // babel的配置文件
├── package.json
├── src
│   ├── App.vue
│   ├── api     // 接口地址目录
│   ├── assets  // 存放一些静态文件
│   ├── components // 组件都放在这个文件夹里
│   ├── config  // 一些默认的配置文件 以及router路由表都是在这个文件配置
│   ├── core    
│   ├── layouts   // 全局布局组件
│   ├── main.js     // 入口文件
│   ├── permission.js   // 权限鉴权js逻辑
│   ├── router     // vuerouter
│   ├── store      // vuex 
│   ├── style      // 整个后台的全局CSS样式
│   ├── utils      // 存放一些插件和工具类函数
│   └── views      // 存放页面
└── vue.config.js  // vue环境配置文件
```

### 项目还未完成 待更新
