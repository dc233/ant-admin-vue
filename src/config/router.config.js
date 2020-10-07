import { UserLayout, BasicLayout, RouteView } from '@/layouts'

// 异步路由
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard/workplace',
    component: BasicLayout,
    meta: { title: '首页' },
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '仪表盘',
          keepAlive: true,
          icon: 'line-chart',
          permission: ['dashboard']
        },
        children: [
          {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作台',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: 'test',
            name: 'test',
            component: () => import('@/views/dashboard/test'),
            meta: {
              title: '测试',
              keepAlive: true,
              permission: ['dashboard']
            }
          }
        ]
      },
      {
        path: 'form',
        name: 'Form',
        redirect: '',
        component: RouteView,
        meta: {
          title: '表单页',
          keepAlive: true,
          icon: 'form',
          permission: ['form']
        },
        children: [
          {
            path: '/form/base-form',
            name: 'Baseform',
            component: () => import('@/views/form/basicForm'),
            meta: { title: '基础表单', keepAlive: false, permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'Stepform',
            component: () => import('@/views/form/stepForm/index'),
            meta: { title: '分步表单', keepAlive: true }
          },
          {
            path: '/form/advace-form',
            name: 'advanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true }
          }
        ]
      },
      {
        path: 'table',
        name: 'Table',
        redirect: '',
        component: RouteView,
        meta: {
          title: '表格',
          keepAlive: true,
          icon: 'table',
          permission: ['table']
        },
        children: [
          {
            path: '/table/tablesearch',
            name: 'TableSearch',
            component: () => import('@/views/table/tableSearch'),
            meta: { title: '查询表格', keepAlive: true, permission: ['table'] }
          }
        ]
      },
      {
        path: 'systemsting',
        name: 'SystemSting',
        component: RouteView,
        meta: {
          title: '系统设置',
          keepAlive: true,
          icon: 'setting',
          permission: ['setting']
        },
        children: [
          {
            path: '/systemsting/mechanism',
            name: 'mechanism',
            component: () => import('@/views/systemSting/mechanism'),
            meta: { title: '机构管理', keepAlive: true }
          },
          {
            path: '/systemsting/competence',
            name: 'competence',
            component: () => import('@/views/systemSting/competence'),
            meta: { title: '权限配置', keepAlive: true }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * @description: 基本路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    name: 'User',
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/user/register')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
