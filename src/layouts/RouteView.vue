<template>
  <basic-layout>
    <multi-tab v-if="multiTab" @close="remove"></multi-tab>
    <a-keep-alive v-if="this.multiTab" v-model="clearCaches">
      <router-view v-if="!refreshing" ref="tabContent" :key="$route.fullPath" />
    </a-keep-alive>
    <router-view v-else />
  </basic-layout>
</template>
<script>
import { mixinDevice, mixin } from '@/utils/mixin'
import BasicLayout from './BasicLayout'
import AKeepAlive from '@/components/cache/AKeepAlive'
// import PageToggleTransition from '@/components/transition/PageToggleTransition'
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  mixins: [mixinDevice, mixin],
  components: { AKeepAlive, BasicLayout },
  data() {
    return {
      clearCaches: [],
      refreshing: false
    }
  },
  methods: {
    remove(key, next) {
      this.clearCaches = key
    },
    clearCache(page) {
      console.log(page)
      page._init_ = false
      this.clearCaches = [page.cachedKey]
    }
  }
  // render() {
  //   const {
  //     $route: { meta },
  //     $store: { getters }
  //   } = this
  //   const inKeep = (
  //     <keep-alive exclude={this.excludelist} rf>
  //       <router-view key={this.$route.fullPath} />
  //     </keep-alive>
  //   )
  //   const notKeep = <router-view />
  //   // 这里增加了 multiTab 的判断，当开启了 multiTab 时
  //   // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
  //   // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
  //   if (!getters.multiTab && !meta.keepAlive) {
  //     return notKeep
  //   }
  //   return this.keepAlive || getters.multiTab || meta.keepAlive ? inKeep : notKeep
  // }
}
</script>
