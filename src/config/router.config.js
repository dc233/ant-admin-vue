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
              keepAlive: false,
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
          }
        ]
      },
      {
        path: "form",
        name: "Form",
        redirect: "",
        component: RouteView,
        meta: {
          title: "表单页",
          keepAlive: true,
          icon: "form",
          permission: ["form"]
        },
        children: [
          {
            path: "/form/base-form",
            name: "Baseform",
            component: () => import("@/views/form/basicForm"),
            meta: { title: "基础表单", keepAlive: true, permission: ["form"] }
          }
        ]
      },
      {
        path: "*",
        redirect: "/404",
        hidden: true
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
