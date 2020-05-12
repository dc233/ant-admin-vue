import Vue from "vue";
import axios from "axios";
import Qs from "qs";
import store from "@/store";
import router from "@/router";
import { message } from "ant-design-vue";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const $axios = axios.create({
  // 设置超时时间
  timeout: 30000,
  // 基础url，会在请求url中自动添加前置链接
  baseURL: process.env.VUE_APP_BASE_API
});

// 请求拦截器
$axios.interceptors.request.use(
  config => {
    const token = Vue.ls.get(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = token; // 请求头部添加token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
$axios.interceptors.response.use(
  response => {
    const code = response.status;
    if ((code >= 200 && code < 300) || code === 304) {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回401 清除token信息并跳转到登陆页面
          store.commit("DEL_TOKEN");
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;
        case 404:
          message.error("网络请求不存在");
          break;
        case 503:
          message.error("服务器不可用");
          break;
        case 413:
          message.error("请求实体过大,服务器无法处理请求");
          break;
        default:
          message.error(error.response.data.message);
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes("timeout")) {
        message.error("请求超时！请检查网络是否正常");
      } else {
        message.error("请求失败，请检查网络是否已连接");
      }
    }
    return Promise.reject(error);
  }
);

// get，post请求方法
export default {
  post(url, data) {
    return $axios({
      method: "post",
      url,
      data: Qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
  },
  get(url, params) {
    return $axios({
      method: "get",
      url,
      params
    });
  }
};
