import Vue from 'vue'
import config from '@/config/defaultSettings'
import Viser from 'viser-vue'
import MultiTab from '@/components/MultiTab'
import action from './directives/action'
import VueStorage from 'vue-ls'
import { PageView } from '@/layouts'
import ExcelExport from '@/components/excelExport/excelExport'
import ExcelImport from '@/components/excelImport/excelImport'
import VueimgPreview from '@/components/imgPreview/index.js'
import animate from 'animate.css'
// 注册全局的布局组件
Vue.component('PageView', PageView)
Vue.component('ExcelExport', ExcelExport)
Vue.component('ExcelImport', ExcelImport)
Vue.use(animate)
Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(VueStorage, config.storageOptions)
// 注册权限指令
Vue.use(action)
Vue.use(VueimgPreview)
