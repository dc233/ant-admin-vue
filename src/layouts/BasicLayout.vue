<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${theme.mode}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
      :bodyStyle="mobileStyle"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="theme.mode"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
        :class="['mobilemenu']"
      ></side-menu>
    </a-drawer>
    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="theme.mode"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>
    <a-layout :class="[layoutMode]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <a-layout :class="[`content-width-${contentWidth}`]">
        <!--layout header -->
        <global-header
          :mode="layoutMode"
          :menus="menus"
          :theme="theme.mode"
          :collapsed="collapsed"
          :device="device"
          @toggle="toggle"
        />
        <!-- layout contennt -->
        <a-layout-content
          :style="{
            height: '100%',
            margin: '24px 24px 0',
            paddingTop: fixedHeader ? '64px' : '0'
          }"
          :theme="theme.mode"
        >
          <slot></slot>
        </a-layout-content>
        <!-- layout footer -->
        <a-layout-footer></a-layout-footer>
        <setting-drawe />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from './Global/header'
import SideMenu from './Global/SideMenu'
import SettingDrawe from '@/components/SettingDrawe'
import { triggerWindowResizeEvent } from '@/utils/util'
import { mixin, mixinDevice } from '@/utils/mixin'
import { mapState, mapActions } from 'vuex'
import { convertRoutes } from '@/utils/routeConvert'
export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    SideMenu,
    GlobalHeader,
    SettingDrawe
  },
  data() {
    return {
      collapsed: false,
      menus: [],
      Open: false,
      mobileStyle: {
        padding: 0
      }
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  created() {
    const routes = convertRoutes(this.mainMenu.find((item) => item.path === '/'))
    this.menus = (routes && routes.children) || []
    this.collapsed = !this.sidebarOpened
  },
  methods: {
    drawerClose() {
      this.collapsed = false
    },
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    menuSelect() {}
  }
}
</script>

<style lang="less">
.page-transition-enter {
  opacity: 0;
}
.page-transition-leave-active {
  opacity: 0;
}
.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
