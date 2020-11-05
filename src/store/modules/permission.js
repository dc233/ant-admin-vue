import { asyncRouterMap, constantRouterMap } from '@/config/router.config'
import { BlankView, RouteView } from '@/layouts'

function loadView(view) {
  return () => import(`@/views/${view}`)
}

function filterMenue(tree) {
  tree.map((item) => {
    delete item['id']
    delete item['p_id']
    delete item['url']
    delete item['sort']
    delete item['action']
    delete item['create_time']
    delete item['update_time']
    delete item['is_del']
    if (item.hidden) {
      if (item.hidden === 2) {
        item.hidden = false
      } else if (item.hidden === 1) {
        item.hidden = true
      }
    }
    if (item.component === 'RouteView') {
      item.component = RouteView
    } else if (item.component === 'BlankView') {
      item.component = BlankView
    } else {
      item.component = loadView(item.component)
    }
    if (item.children) {
      item.children.map((val) => {
        if (val.featuresurl != '') {
          delete item.children
        }
      })
    }

    item.children && this.treejson(item.children)
  })
  return tree
}
/**
 *
 * @description: 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 * @param permission
 * @param route
 * @return:  {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter((route) => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve(accessedRouters)
      })
    }
  }
}

export default permission
