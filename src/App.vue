<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { AppDeviceEnquire } from '@/utils/mixin'
export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
}
</style>
