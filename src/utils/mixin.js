import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

const mixin = {
  computed: {
    ...mapState({
      layoutMode: (state) => state.app.layout,
      theme: (state) => state.app.theme,
      primaryColor: (state) => state.app.theme.color,
      colorWeak: (state) => state.app.weak,
      fixedHeader: (state) => state.app.fixedHeader,
      fixSiderbar: (state) => state.app.fixSiderbar,
      fixSidebar: (state) => state.app.fixSiderbar,
      contentWidth: (state) => state.app.contentWidth,
      autoHideHeader: (state) => state.app.autoHideHeader,
      sidebarOpened: (state) => state.app.sidebar,
      multiTab: (state) => state.app.multiTab,
      showLayout: (state) => state.app.showlayout,
      fixdTaps: (state) => state.app.fixdTaps,
      palettes: (state) => state.app.palettes,
      disable: (state) => state.app.animate.disabled,
      animatename: (state) => state.app.animate.name,
      preset: (state) => state.app.preset
    })
  },
  data() {
    return {
      visbil: false
    }
  },
  methods: {
    isTopMenu() {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu() {
      return !this.isTopMenu()
    }
  }
}
const mixinDevice = {
  computed: {
    ...mapState({
      device: (state) => state.app.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}
const AppDeviceEnquire = {
  mounted() {
    const { $store } = this
    deviceEnquire((deviceType) => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

export { AppDeviceEnquire, mixinDevice, mixin }
