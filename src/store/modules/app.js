import Vue from "vue";
import { SIDEBAR_TYPE } from "@/store/mutation-types";
const app = {
  state: {
    sidebar: true,
    device: "desktop"
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type;
      Vue.ls.set(SIDEBAR_TYPE, type);
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    }
  },
  actions: {
    setSidebar({ commit }, type) {
      commit("SET_SIDEBAR_TYPE", type);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    }
  }
};

export default app;
