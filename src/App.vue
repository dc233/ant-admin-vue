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
import themeUtil from '@/utils/themeUtil'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { mixin, AppDeviceEnquire } from '@/utils/mixin'
export default {
  mixins: [mixin, AppDeviceEnquire],
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      locale: zhCN,
      isRouterAliver: true
    }
  },
  mounted() {
    themeUtil.changeThemeColor(this.theme.color, this.theme.mode)
  },
  watch: {
    'theme.mode': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题模式 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(this.theme.color, val).then(closeMessage)
    },
    'theme.color': function(val) {
      let closeMessage = this.$message.loading(`您选择了主题色 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(val, this.theme.mode).then(closeMessage)
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
