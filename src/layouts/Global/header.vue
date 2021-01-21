<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[
          'admin-header',
          fixedHeader && 'ant-header-fixedHeader',
          sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed',
          fixedtabs
        ]"
        :style="{ padding: '0' }"
      >
        <div v-if="mode === 'sidemenu'" class="header">
          <a-icon
            v-if="device === 'mobile'"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"
          />
          <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
          <user-menu></user-menu>
        </div>
        <div v-else :class="['top-nav-header-index', sideTheme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="sideTheme" />
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
            <user-menu class="header-index-right"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../../components/tools/UserMenu'
import SMenu from './menu'
import Logo from '../../components/tools/Logo'
import { mixin } from '@/utils/mixin'
export default {
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    navtheme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  name: 'GlobalHeader',
  mixins: [mixin],
  computed: {
    sideTheme() {
      return this.theme.mode == 'light' ? this.theme.mode : 'dark'
    },
    // eslint-disable-next-line vue/return-in-computed-property
    fixedtabs() {
      if (this.fixdTaps && this.fixedHeader === false) {
        return 'ant-header-fixedtab'
      } else if (this.fixedHeader) {
        return 'fixed-heade-tabs'
      }
    }
  },
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  data() {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    handleScroll() {
      if (!this.autoHideHeader) {
        return
      }
      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    handelRefresh() {
      this.reload()
    }
  },
  beforeDestroy() {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style lang="less">
@import '../../style/idnex.less';
.header-animat {
  position: relative;
  z-index: 98;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
