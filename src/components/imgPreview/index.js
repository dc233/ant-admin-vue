/**
 *  Author: 图片预览插件
 * 插件以全局已入
 * 调用方法
 * @param {String Array}
 * @function this.$imagePreview()
 */

import ImagePreview from './index.vue'

const VueImageSwipe = {}

VueImageSwipe.install = (Vue, options = {}) => {
  const PreviewController = Vue.extend(ImagePreview)
  Vue.prototype.$imagePreview = (opts = {}) => {
    const elem = document.createElement('div')
    let instance = new PreviewController()
    instance.$mount(elem)
    instance.isShow = true
    instance.datas = opts
    document.body.appendChild(instance.$el)
    instance.$on('close', () => {
      document.body.removeChild(instance.$el)
      instance = null
    })
  }
}

export default VueImageSwipe
