import Vue from "vue";
import config from "@/config/defaultSettings";
// 引入antdesig_UI
import "@/core/lazy_lib/components_use";
import VueStorage from "vue-ls";

Vue.use(VueStorage, config.storageOptions);
