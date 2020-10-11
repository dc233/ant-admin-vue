<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAliver" />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { globalTheme } from '@/components/SettingDrawe/settingConfig'
moment.locale('zh-cn')
import { mixin, AppDeviceEnquire } from '@/utils/mixin'
export default {
  mixins: [mixin, AppDeviceEnquire],
  provide() {
    return {
      reload: this.reload
    }
  },
  mounted() {
    globalTheme(this.primaryColor)
  },
  data() {
    return {
      locale: zhCN,
      isRouterAliver: true
    }
  },
  methods: {
    reload() {
      this.isRouterAliver = false
      this.$nextTick(function() {
        this.isRouterAliver = true
      })
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
