import { UserLayout, BasicLayout, RouteView } from "@/layouts";

// 异步路由
export const asyncRouterMap = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "首页" },
    redirect: "/dashboard/workplace",
    children: [
      // dashboard
      {
        path: "dashboard",
        name: "dashboard",
        redirect: "/dashboard/workplace",
        component: RouteView,
        meta: {
          title: "仪表盘",
          keepAlive: true,
          icon: "line-chart",
          permission: ["dashboard"]
        },
        children: [
          {
            path: "workplace",
            name: "Workplace",
            component: () => import("@/views/dashboard/Workplace"),
            meta: {
              title: "工作台",
              keepAlive: true,
              permission: ["dashboard"]
            }
          },
          {
            path: "test",
            name: "test",
            component: () => import("@/views/dashboard/test"),
            meta: {
              title: "测试",
              keepAlive: true,
              permission: ["dashboard"]
            }
          },
          {
            path: "test1",
            name: "test1",
            component: () => import("@/views/dashboard/test1"),
            meta: {
              title: "测试1",
              keepAlive: true,
              permission: ["dashboard"]
            }
          },
          {
            path: "test2",
            name: "test2",
            component: () => import("@/views/dashboard/test2"),
            meta: {
              title: "测试2",
              keepAlive: true,
              permission: ["dashboard"]
            }
          },
          {
            path: "test3",
            name: "test3",
            component: () => import("@/views/dashboard/test3"),
            meta: {
              title: "测试3",
              keepAlive: true,
              permission: ["dashboard"]
            }
          }
        ]
      }
    ]
  }
];

/**
 * @description: 基本路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/user",
    name: "User",
    redirect: "/user/login",
    component: UserLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/user/login")
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/views/user/register")
      }
    ]
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404")
  }
];
