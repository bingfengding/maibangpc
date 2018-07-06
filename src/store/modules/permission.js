import {RouterMap} from '@/router/index'

/**
 * 通过meta.role判断是否与当前用户权限匹配,后期权限设置
 * @param roles
 * @param route
 */
function hasPermission(route) {
    return roles
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(RouterMap) {
  const accessedRouters = RouterMap.filter(route => {
    if (hasPermission(route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: RouterMap,
    addRouters: [],
    isCreater:false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = RouterMap.concat(routers)
    },
    setIsCreater: (state,value) => {
      state.isCreater = value
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = RouterMap
        } else {
          accessedRouters = filterAsyncRouter(RouterMap)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
