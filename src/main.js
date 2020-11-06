import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import './theme/index.less'
import './core/user'
import bootstrap from './core/bootstrap'
import './permission'
Vue.use(Antd)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: (h) => h(App)
}).$mount('#app')
