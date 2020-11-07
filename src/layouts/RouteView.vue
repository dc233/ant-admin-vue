<template>
  <basic-layout>
    <multi-tab v-if="multiTab" @close="remove" @refresh="refresh"></multi-tab>
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
      console.log(key)
      this.clearCaches = key
    },
    refresh(key, page) {
      this.clearCache(page)
      this.reloadContent()
    },
    clearCache(page) {
      console.log(page)
      page._init_ = false
      this.clearCaches = [page.cachedKey]
    },
    reloadContent(onLoaded) {
      this.refreshing = true
      setTimeout(() => {
        this.refreshing = false
      })
    }
  }
}
</script>
