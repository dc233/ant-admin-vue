import Vue from 'vue'
import { ADMIN, ANIMATE } from '@/config/default'
import config from '@/config'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
  FULL_PATH_LIST,
  PRO_PAGES,
  PRO_ACTIVEKEY,
  DEFAULT_FIXED_TABS
} from '@/store/mutation-types'
const app = {
  state: {
    sidebar: true,
    device: 'desktop',
    layout: '',
    contentWidth: '',
    fixedHeader: false,
    fixSiderbar: true,
    fixdTaps: false,
    autoHideHeader: false,
    color: null,
    weak: false,
    multiTab: true,
    showlayout: false,
    fullPathList: [],
    pages: [],
    activeKey: '',
    palettes: ADMIN.palettes,
    preset: ANIMATE.preset,
    ...config
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      Vue.ls.set(SIDEBAR_TYPE, type)
    },
    CLOSE_SIDEBAR: (state) => {
      Vue.ls.set(SIDEBAR_TYPE, true)
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      // setStore('_DEFAULT_THEME', theme)
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme.mode = theme
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      Vue.ls.set(DEFAULT_LAYOUT_MODE, layout)
      state.layout = layout
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER, fixed)
      state.fixedHeader = fixed
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      Vue.ls.set(DEFAULT_FIXED_SIDEMENU, fixed)
      state.fixSiderbar = fixed
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      Vue.ls.set(DEFAULT_FIXED_HEADER_HIDDEN, show)
      state.autoHideHeader = show
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      Vue.ls.set(DEFAULT_CONTENT_WIDTH_TYPE, type)
      state.contentWidth = type
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color)
      state.theme.color = color
    },
    TOGGLE_WEAK: (state, flag) => {
      Vue.ls.set(DEFAULT_COLOR_WEAK, flag)
      state.weak = flag
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      Vue.ls.set(DEFAULT_MULTI_TAB, bool)
      state.multiTab = bool
    },
    SHOW_LOAYOUT: (state, show) => {
      state.showlayout = show
    },
    ADD_FULLPATHLIST: (state, val) => {
      state.fullPathList = val
      Vue.ls.set(FULL_PATH_LIST, val)
    },
    ADD_PAGES: (state, val) => {
      state.pages = val
      Vue.ls.set(PRO_PAGES, val)
    },
    ADD_ACTIVEKEY: (state, val) => {
      state.activeKey = val
      Vue.ls.set(PRO_ACTIVEKEY, val)
    },
    SET_ANIMATE: (state, val) => {
      state.animate.disabled = val
    },
    SET_ANIMATE_NAME: (state, val) => {
      state.animate.name = val
    },
    DEFAULT_FIXED_TABS: (state, tabs) => {
      state.fixdTaps = tabs
      Vue.ls.set(DEFAULT_FIXED_TABS, tabs)
    }
  },
  actions: {
    setSidebar({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme({ commit }, theme) {
      commit('TOGGLE_THEME', theme)
    },
    ToggleLayoutMode({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode)
    },
    ToggleFixedHeader({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false)
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader)
    },
    ToggleFixSiderbar({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar)
    },
    ToggleFixedHeaderHidden({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show)
    },
    ToggleContentWidth({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type)
    },
    ToggleColor({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    },
    ToggleWeak({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag)
    },
    ToggleMultiTab({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool)
    },
    showLayout({ commit }, show) {
      commit('SHOW_LOAYOUT', show)
    },
    AddFuliPatnList({ commit }, val) {
      commit('ADD_FULLPATHLIST', val)
    },
    AddPages({ commit }, val) {
      commit('ADD_PAGES', val)
    },
    AddActiveKey({ commit }, val) {
      commit('ADD_ACTIVEKEY', val)
    },
    setAnimate({ commit }, val) {
      commit('SET_ANIMATE', val)
    },
    setAnimateName({ commit }, val) {
      commit('SET_ANIMATE_NAME', val)
    },
    setFixedtabs({ commit }, val) {
      commit('DEFAULT_FIXED_TABS', val)
    }
  }
}

export default app
