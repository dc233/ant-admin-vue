import Vue from 'vue'
import { login, getInfo, logout, getRole } from '@/api/login'
import { ACCESS_TOKEN, FULL_PATH_LIST, PRO_PAGES, PRO_ACTIVEKEY } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { message } from 'ant-design-vue'

/**
 * 遍历路由菜单里的按钮权限
 *
 * @param acitionlist
 * @param permissionId
 * @returns {*}
 */
function treeForeach(tree, func) {
  tree.forEach((data) => {
    func(data)
    data.children && treeForeach(data.children, func) // 遍历子树
  })
}

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            if (res.code === 200) {
              const result = res.data.userInfo
              Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', result.token)
              console.log(res)
              resolve(res)
            } else {
              message.error(res.data.userInfo)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const result = res.data
            if (result.roles && result.roles.permissions.length > 0) {
              const role = result.roles
              role.permissions = result.roles.permissions
              // console.log(role.permissions)
              role.permissions.map((per) => {
                if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                  const action = per.actionEntitySet.map((action) => {
                    return action.action
                  })
                  per.actionList = action
                }
              })
              role.permissionList = role.permissions.map((permission) => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.roles)
              commit('SET_INFO', result)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }

            commit('SET_NAME', { name: result.name, welcome: welcome() })
            commit('SET_AVATAR', result.avatar)
            console.log(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
        // 测试role
        getRole().then((res) => {
          const result = res.data
          let permissions = []
          treeForeach(result, function(item) {
            if (item.meta.permission != '') {
              let emity = {
                actionList: []
              }
              emity.permissionId = item.meta.permission
              if (item.children) {
                item.children.forEach((item) => {
                  emity.actionList.push(item.action)
                })
              }
              permissions.push(emity)
            }
          })
          console.log(permissions)
        })
      })
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token)
          .then(() => {
            resolve()
          })
          .catch(() => {
            resolve()
          })
          .finally(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            Vue.ls.remove(ACCESS_TOKEN)
            Vue.ls.remove(FULL_PATH_LIST)
            Vue.ls.remove(PRO_PAGES)
            Vue.ls.remove(PRO_ACTIVEKEY)
          })
      })
    }
  }
}

export default user
