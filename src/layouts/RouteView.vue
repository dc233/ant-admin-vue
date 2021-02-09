<template>
  <basic-layout>
    <multi-tab
      v-if="multiTab"
      :fullPathList="fullPathList"
      :pages="pages"
      :activeKey.sync="activeKey"
      :loading="loading"
      @close="remove"
      @refresh="refresh"
      @copyremove="copyremove"
      @closeThat="closeThat"
      @closeLeft="closeLeft"
      @closeRight="closeRight"
      @closeAll="closeAll"
    >
    </multi-tab>
    <span class="page-loading"> <a-spin size="large" :spinning="this.loading"/></span>
    <a-keep-alive v-if="this.multiTab" :exclude-keys="excludeKeys" v-model="clearCaches" :max="10">
      <router-view v-if="!refreshing" ref="tabContent" :key="$route.fullPath" />
    </a-keep-alive>
    <router-view v-else-if="!refreshing" />
  </basic-layout>
</template>
<script>
import Vue from 'vue'
import { mixinDevice, mixin } from '@/utils/mixin'
import BasicLayout from './BasicLayout'
import AKeepAlive from '@/components/cache/AKeepAlive'
import { FULL_PATH_LIST, PRO_PAGES, PRO_ACTIVEKEY } from '@/store/mutation-types'
export default {
  name: 'RouteView',
  mixins: [mixinDevice, mixin],
  components: { AKeepAlive, BasicLayout },
  data() {
    return {
      clearCaches: [],
      refreshing: false,
      fullPathList: [],
      pages: [],
      activeKey: '',
      loading: false,
      excludeKeys: []
    }
  },
  watch: {
    '$router.options.routes': function(val) {
      console.log(val)
      this.excludeKeys = []
      this.loadCacheConfig(val)
    },
    $route: function(newVal) {
      this.activeKey = newVal.fullPath
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        this.fullPathList.push(newVal.fullPath)
        this.pages.push(this.creataPage(newVal))
        this.$store.dispatch('AddFuliPatnList', this.fullPathList)
        this.$store.dispatch('AddActiveKey', this.activeKey)
      }
      if (this.multiTab) {
        this.$nextTick(() => {
          this.setCachedKey(newVal)
          this.$store.dispatch('AddPages', this.pages)
        })
      }
    },
    activeKey: function(newPathKey) {
      this.$router.push({ path: newPathKey })
      this.$store.dispatch('AddActiveKey', newPathKey)
    }
  },
  created() {
    this.loadCacheConfig(this.$router?.options?.routes)
    // console.log(this.$router)
  },
  mounted() {
    let tab = Vue.ls.get(PRO_PAGES)
    let pahtlist = Vue.ls.get(FULL_PATH_LIST)
    let active = Vue.ls.get(PRO_ACTIVEKEY)
    if (tab === null && pahtlist === null && active === null) {
      this.pages.push(this.creataPage(this.$route))
      this.fullPathList.push(this.$route.fullPath)
      this.activeKey = this.$route.fullPath
      this.$store.dispatch('AddActiveKey', this.activeKey)
      this.$store.dispatch('AddFuliPatnList', this.fullPathList)
      if (this.multiTab) {
        this.$nextTick(() => {
          this.setCachedKey(this.$route)
          this.$store.dispatch('AddPages', this.pages)
        })
      }
    } else {
      this.pages.push(...tab)
      this.fullPathList.push(...pahtlist)
      this.activeKey = active
    }
  },
  methods: {
    // 清除keppalive 缓存
    remove(targetKey) {
      let index = this.pages.findIndex((item) => item.fullPath === targetKey)
      let clearCaches = this.pages.splice(index, 1).map((page) => page.cachedKey)
      this.fullPathList = this.fullPathList.filter((path) => path !== targetKey)
      this.$store.dispatch('AddFuliPatnList', this.fullPathList)
      this.$store.dispatch('AddPages', this.pages)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
      this.clearCaches = clearCaches
    },
    // 标签跳转到最后一个
    copyremove(targetKey) {
      let index = this.pages.findIndex((item) => item.fullPath === targetKey)
      this.pages.splice(index, 1).map((page) => page.cachedKey)
      this.fullPathList = this.fullPathList.filter((path) => path !== targetKey)
      this.$store.dispatch('AddFuliPatnList', this.fullPathList)
      this.$store.dispatch('AddPages', this.pages)
      // 判断当前标签是否关闭，若关闭则跳转到最后一个还存在的标签页
      if (!this.fullPathList.includes(this.activeKey)) {
        this.selectedLastPath()
      }
    },
    selectedLastPath() {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
      this.$store.dispatch('AddActiveKey', this.activeKey)
    },
    // 关闭其他
    closeThat(e) {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (this.fullPathList.length > 1) {
        this.remove(e)
      } else {
        this.$message.info('这是最后一个标签了, 无法被关闭')
      }
    },
    // 关闭左边
    closeLeft(e) {
      const index = this.pages.findIndex((item) => item.fullPath === e)
      const clearPages = this.pages.filter((item, i) => i < index && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.clearCaches = clearCaches
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex > 0) {
        this.fullPathList.forEach((item, index) => {
          if (index < currentIndex) {
            this.copyremove(item)
          }
        })
      } else {
        this.$message.info('左侧没有标签')
      }
    },
    // 关闭右边
    closeRight(e) {
      const index = this.pages.findIndex((item) => item.fullPath === e)
      const clearPages = this.pages.filter((item, i) => i > index && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.clearCaches = clearCaches
      const currentIndex = this.fullPathList.indexOf(e)
      if (currentIndex < this.fullPathList.length - 1) {
        this.fullPathList.forEach((item, index) => {
          if (index > currentIndex) {
            this.copyremove(item)
          }
        })
      } else {
        this.$message.info('右侧没有标签')
      }
    },
    // 关闭全部
    closeAll(e) {
      const clearPages = this.pages.filter((item) => item.fullPath !== e && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.clearCaches = clearCaches
      const currentIndex = this.fullPathList.indexOf(e)
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.copyremove(item)
        }
      })
    },
    // 刷新组件
    refresh(page) {
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
      this.loading = true
      setTimeout(() => {
        this.refreshing = false
        this.loading = false
      }, 1000)
    },
    // 遍历router 取值
    creataPage(route) {
      return {
        name: route.name,
        meta: route.meta,
        keyPath: route.matched[route.matched.length - 1].path,
        fullPath: route.fullPath,
        unclose: route.meta && route.meta.page && route.meta.page.closable === false
      }
    },
    /**
     * 设置页面缓存的key
     * @param route 页面对应的路由
     */
    setCachedKey(route) {
      const page = this.pages.find((item) => item.fullPath === route.fullPath)
      const vnode = this.$refs.tabContent.$vnode
      page.cachedKey = vnode.key + vnode.componentOptions.Ctor.cid
    },
    /**
     * 设置页面需不需要缓存
     * @param route 页面对应的路由
     */
    loadCacheConfig(route, pCache = true) {
      route.forEach((item) => {
        const cacheAble = item.meta?.cacheAble ?? pCache ?? true
        if (!cacheAble) {
          this.excludeKeys.push(new RegExp(`${item.path}\\d+$`))
        }
        if (item.children) {
          this.loadCacheConfig(item.children, cacheAble)
        }
      })
    }
  }
}
</script>
