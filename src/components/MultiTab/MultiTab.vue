<script>
import events from './events'
import { FULL_PATH_LIST, PRO_PAGES, PRO_ACTIVEKEY } from '@/store/mutation-types'
import { mixinDevice } from '@/utils/mixin'
import Vue from 'vue'
export default {
  name: 'MultiTab',
  mixins: [mixinDevice],
  data() {
    return {
      fullPathList: [],
      pages: [],
      activeKey: '',
      newTabIndex: 0,
      fixdTaps: false,
      loading: false
    }
  },
  created() {
    // bind event
    events
      .$on('open', (val) => {
        if (!val) {
          throw new Error(`multi-tab: open tab ${val} err`)
        }
        this.activeKey = val
      })
      .$on('close', (val) => {
        if (!val) {
          this.closeThat(this.activeKey)
          return
        }
        this.closeThat(val)
      })
      .$on('rename', ({ key, name }) => {
        console.log('rename', key, name)
        try {
          const item = this.pages.find((item) => item.path === key)
          item.meta.customTitle = name
          this.$forceUpdate()
        } catch (e) {}
      })
    let tab = Vue.ls.get(PRO_PAGES)
    let pahtlist = Vue.ls.get(FULL_PATH_LIST)
    let active = Vue.ls.get(PRO_ACTIVEKEY)
    if (tab === null && pahtlist === null && active === null) {
      this.pages.push(this.creataPage(this.$route))
      this.fullPathList.push(this.$route.fullPath)
    } else {
      this.pages.push(...tab)
      this.fullPathList.push(...pahtlist)
      this.activeKey = active
    }
  },
  watch: {
    $route: function(newVal) {
      this.activeKey = newVal.fullPath
      if (this.fullPathList.indexOf(newVal.fullPath) < 0) {
        this.fullPathList.push(newVal.fullPath)
        this.pages.push(this.creataPage(newVal))
        this.$store.dispatch('AddFuliPatnList', this.fullPathList)
        this.$store.dispatch('AddPages', this.pages)
        this.$store.dispatch('AddActiveKey', this.activeKey)
      }
    },
    activeKey: function(newPathKey) {
      this.$router.push({ path: newPathKey })
      this.$store.dispatch('AddActiveKey', newPathKey)
    }
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
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
      this.$emit('close', clearCaches)
    },
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
    // content menu
    closeThat(e) {
      // 判断是否为最后一个标签页，如果是最后一个，则无法被关闭
      if (this.fullPathList.length > 1) {
        this.remove(e)
      } else {
        this.$message.info('这是最后一个标签了, 无法被关闭')
      }
    },
    closeLeft(e) {
      const index = this.pages.findIndex((item) => item.fullPath === e)
      const clearPages = this.pages.filter((item, i) => i < index && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.$emit('close', clearCaches)
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
    closeRight(e) {
      const index = this.pages.findIndex((item) => item.fullPath === e)
      const clearPages = this.pages.filter((item, i) => i > index && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.$emit('close', clearCaches)
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
    closeAll(e) {
      const clearPages = this.pages.filter((item) => item.fullPath !== e && !item.unclose)
      let clearCaches = clearPages.map((item) => item.cachedKey)
      this.$emit('close', clearCaches)
      const currentIndex = this.fullPathList.indexOf(e)
      this.fullPathList.forEach((item, index) => {
        if (index !== currentIndex) {
          this.copyremove(item)
        }
      })
    },
    closeMenuClick(key, route) {
      this[key](route)
    },
    renderTabPaneMenu(e) {
      return (
        <a-menu
          {...{
            on: {
              click: ({ key, item, domEvent }) => {
                this.closeMenuClick(key, e)
              }
            }
          }}>
          <a-menu-item key="closeThat">关闭当前标签</a-menu-item>
          <a-menu-item key="closeRight">关闭右侧</a-menu-item>
          <a-menu-item key="closeLeft">关闭左侧</a-menu-item>
          <a-menu-item key="closeAll">关闭全部</a-menu-item>
        </a-menu>
      )
    },

    // render
    renderTabPane(title, keyPath) {
      const menu = this.renderTabPaneMenu(keyPath)
      return (
        <a-dropdown overlay={menu} trigger={['contextmenu']}>
          <span style={{ userSelect: 'none' }}>{title}</span>
        </a-dropdown>
      )
    },
    // 锁定tabs
    changeTabs() {
      this.fixdTaps = !this.fixdTaps
      if (this.fixdTaps) {
        this.$store.commit('setFixedTabs', false)
      } else {
        this.$store.commit('setFixedTabs', true)
      }
    },
    // 刷新Vue组件方法
    haneltabClick() {
      this.loading = true
      setTimeout(() => {
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
        cachedKey: route.fullPath,
        _init_: true,
        loading: false,
        unclose: route.meta && route.meta.page && route.meta.page.closable === false
      }
    }
  },
  render() {
    const {
      onEdit,
      haneltabClick,
      refresh,
      $data: { pages }
    } = this
    const panes = pages.map((page) => {
      return (
        <a-tab-pane style={{ height: 0 }} key={page.fullPath} closable={pages.length > 1}>
          <span slot="tab">
            <a-icon class={{ hide: page.fullPath != this.activeKey }} type={this.loading ? 'loading' : 'sync'} onClick={this.haneltabClick} />
            {this.renderTabPane(page.meta.customTitle || page.meta.title, page.fullPath)}
          </span>
        </a-tab-pane>
      )
    })
    return (
      <div class={{ 'ant-pro-multi-tab': true, affixed: this.fixdTaps }}>
        <div class="ant-pro-multi-tab-wrapper">
          <a-tabs
            hideAdd
            type={'editable-card'}
            v-model={this.activeKey}
            tabBarStyle={{
              background: '#FFF',
              margin: 0,
              paddingLeft: '16px',
              paddingTop: '1px'
            }}
            {...{ on: { edit: onEdit } }}>
            {panes}
          </a-tabs>
          <a-tooltip placement="left" title={this.fixdTaps ? '点击解除锁定' : '点击锁定页签头'} trigger={'click'}>
            <div class="locktab">
              <a-icon type={this.fixdTaps ? 'lock' : 'unlock'} onClick={this.changeTabs} />
            </div>
          </a-tooltip>
        </div>
      </div>
    )
  }
}
</script>
