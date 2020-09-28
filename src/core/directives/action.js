import Vue from 'vue'
import store from '@/store'

const action = Vue.directive('action', {
  inserted: function(el, binding, vnode) {
    const actionName = binding.arg
    const roles = store.getters.roles
    const elVal = vnode.context.$route.meta.permission
    const permissionId = (elVal instanceof String && [elVal]) || elVal
    console.log(elVal)
    roles.permissions.forEach((item) => {
      if (!permissionId.includes(item.permissionId)) {
        return
      }
      if (item.actionList && !item.actionList.includes(actionName)) {
        ;(el.parentNode && el.parentNode.removeChild(el)) || (el.style.display = 'none')
      }
    })
  }
})

export default action
