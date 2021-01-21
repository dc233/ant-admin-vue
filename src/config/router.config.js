import { UserLayout, BlankView, RouteView } from '@/layouts'

// 异步路由
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    redirect: '/dashboard/workplace',
    component: RouteView,
    meta: { title: '首页' },
    children: [
      // dashboard
      {
        path: 'newPage',
        name: 'newPage',
        component: () => import('@/views/NewPage'),
        meta: {
          title: '新页面',
          cacheAble: false
        }
      },
      {
        path: 'testpage',
        name: 'testpage',
        component: () => import('@/views/newptest'),
        meta: {
          title: '新页面1',
          cacheAble: false
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: BlankView,
        meta: {
          title: '仪表盘',
          icon: 'line-chart',
          cacheAble: false,
          permission: ['dashboard']
        },
        children: [
          {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作台',
              permission: ['dashboard']
            }
          },
          {
            path: 'test',
            name: 'test',
            component: () => import('@/views/dashboard/test'),
            meta: {
              title: '测试',
              permission: ['dashboard']
            }
          }
        ]
      },
      {
        path: 'form',
        name: 'Form',
        redirect: '',
        component: BlankView,
        meta: {
          title: '表单页',
          icon: 'form',
          cacheAble: false,
          permission: ['form']
        },
        children: [
          {
            path: '/form/base-form',
            name: 'Baseform',
            component: () => import('@/views/form/basicForm'),
            meta: { title: '基础表单', permission: ['form'] }
          },
          {
            path: '/form/step-form',
            name: 'Stepform',
            component: () => import('@/views/form/stepForm/index'),
            meta: { title: '分步表单' }
          },
          {
            path: '/form/advace-form',
            name: 'advanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单' }
          }
        ]
      },
      {
        path: 'table',
        name: 'Table',
        redirect: '',
        component: BlankView,
        meta: {
          title: '表格',
          cacheAble: false,
          icon: 'table',
          permission: ['table']
        },
        children: [
          {
            path: '/table/tablesearch',
            name: 'TableSearch',
            component: () => import('@/views/table/tableSearch'),
            meta: { title: '查询表格', permission: ['table'] }
          },
          {
            path: '/table/content',
            name: 'content',
            hidden: true,
            component: () => import('@/views/table/content'),
            meta: { title: '表格详情', permission: ['table'] }
          },
          {
            path: '/table/advancedtable',
            name: 'advancedtable',
            component: () => import('@/views/table/advancTable'),
            meta: { title: '高级表格', permission: ['table'] }
          }
        ]
      },
      {
        path: '/other',
        name: 'other',
        component: BlankView,
        meta: {
          title: '其它',
          cacheAble: false,
          icon: 'appstore'
        },
        children: [
          {
            path: '/other/imgpreview',
            name: 'imgpreview',
            component: () => import('@/views/other/PicturPreview'),
            meta: { title: '图片预览' }
          }
        ]
      },
      {
        path: 'systemsting',
        name: 'SystemSting',
        component: BlankView,
        meta: {
          title: '系统设置',
          icon: 'setting',
          cacheAble: false,
          permission: ['setting']
        },
        children: [
          {
            path: '/systemsting/mechanism',
            name: 'mechanism',
            component: () => import('@/views/systemSting/mechanism'),
            meta: { title: '机构管理' }
          },
          {
            path: '/systemsting/competence',
            name: 'competence',
            component: () => import('@/views/systemSting/competence'),
            meta: { title: '角色管理' }
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
