import { UserLayout } from "@/layouts";

// 异步路由
export const asyncRouterMap = [];

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
