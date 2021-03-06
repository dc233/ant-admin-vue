import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import './theme/index.less'
import './core/user'
import bootstrap from './core/bootstrap'
import './permission'
Vue.use(antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
