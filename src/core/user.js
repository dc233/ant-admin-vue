import Vue from "vue";
import config from "@/config/defaultSettings";
import Viser from "viser-vue";
import MultiTab from "@/components/MultiTab";
// 引入antdesig_UI
import "@/core/lazy_lib/components_use";
import VueStorage from "vue-ls";
Vue.use(Viser);
Vue.use(MultiTab);
Vue.use(VueStorage, config.storageOptions);
