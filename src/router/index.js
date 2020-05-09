import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { UserLayout } from "@/layouts";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
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
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
