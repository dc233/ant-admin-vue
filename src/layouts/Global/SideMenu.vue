<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    :collapsible="collapsible"
    width="256px"
    :class="['sider', isDesktop() ? null : 'shadow', theme.mode, fixSiderbar ? 'ant-fixed-sidemenu' : null]"
  >
    <logo />
    <s-menu :collapsed="collapsed" :menu="menus" :theme="theme.mode" :mode="mode" @select="onSelect" style="padding: 16px 0px;"></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './menu.js'
import { mixin, mixinDevice } from '@/utils/mixin'
export default {
  name: 'SideMenu',
  components: {
    Logo,
    SMenu
  },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    navtheme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>

<style lang="less">
@deep: ~'>>>';
.ant-layout {
  @{deep} .ant-layout-sider {
    min-height: 100vh;
  }
}
</style>
