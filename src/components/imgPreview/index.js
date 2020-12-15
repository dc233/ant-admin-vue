import ImagePreview from './index.vue'

let obj = {}

obj.install = function(Vue, options) {
  Vue.prototype.$test = 'hello vue'
  Vue.component(ImagePreview.name, ImagePreview)
}

export default obj
