<script>
import events from './events'
import Vue from 'vue'
import { mixin } from '@/utils/mixin.js'
export default {
  name: 'MultiTab',
  mixins: [mixin],
  props: {
    fullPathList: {
      type: Array
    },
    pages: {
      type: Array
    },
    activeKey: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      visible: false
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
  },
  methods: {
    onEdit(targetKey, action) {
      console.log(targetKey, action)
      this[action](targetKey)
    },
    remove(targetKey) {
      this.$emit('close', targetKey)
    },
    copyremove(targetKey) {
      this.$emit('copyremove', targetKey)
    },

    // content menu
    closeThat(e) {
      this.$emit('closeThat', e)
    },
    closeLeft(e) {
      console.log(e)
      this.$emit('closeLeft', e)
    },
    closeRight(e) {
      this.$emit('closeRight', e)
    },
    closeAll(e) {
      this.$emit('closeAll', e)
    },
    closeMenuClick(key, route) {
      console.log(key, route)
      this[key](route)
    },
    // 刷新Vue组件方法
    haneltabClick(activeKey) {
      let page = this.pages.find((item) => item.fullPath === activeKey)
      this.$emit('refresh', page)
    },
    // 切换页面的回调
    tabChange(activeKey) {
      this.$emit('update:activeKey', activeKey)
    },
    haneltabFixed(val) {
      this.visible = !this.visible
      this.$store.dispatch('setFixedtabs', this.visible)
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
    renderTabPane(title) {
      return <span style={{ userSelect: 'none' }}>{title}</span>
    }
  },
  render() {
    const {
      onEdit,
      haneltabFixed,
      tabChange,
      $props: { pages, fullPathList, activeKey },
      $data: { visible }
    } = this
    const panes = pages.map((page) => {
      return (
        <a-tab-pane style={{ height: 0 }} key={page.fullPath} closable={pages.length > 1}>
          <span slot="tab">{this.renderTabPane(page.meta.customTitle || page.meta.title)}</span>
        </a-tab-pane>
      )
    })
    return (
      <div class={{ 'ant-pro-multi-tab': true }}>
        <div
          class={{
            'ant-top-multi-tab-wrapper ': this.layoutMode === 'topmenu',
            'ant-pro-multi-tab-wrapper': true,
            'ant-filud-multi-tab-wrapper': this.contentWidth === 'Fluid' && this.layoutMode === 'topmenu',
            'ant-fiexed': this.fixdTaps && this.layoutMode === 'sidemenu' && this.sidebarOpened,
            'ant-side-fiexed': this.fixdTaps && this.layoutMode === 'sidemenu' && this.sidebarOpened === false,
            'ant-top-fiexed': this.fixdTaps && this.layoutMode === 'topmenu' && this.contentWidth === 'Fixed',
            'ant-top-fluid-fiexed': this.fixdTaps && this.layoutMode === 'topmenu' && this.contentWidth === 'Fluid'
          }}>
          <a-tabs
            hideAdd
            type={'editable-card'}
            activeKey={this.activeKey}
            tabBarStyle={{
              margin: 0
            }}
            {...{ on: { edit: onEdit, change: tabChange } }}>
            {panes}
          </a-tabs>
          <div class="action">
            <div class="extra-redo" onClick={() => this.haneltabClick(activeKey)}>
              <a-icon type={this.loading ? 'loading' : 'sync'} />
            </div>
            <a-dropdown overlay={this.renderTabPaneMenu(activeKey)} trigger={['click']}>
              <div class="extra-redo">
                <a-icon type="down" />
              </div>
            </a-dropdown>
            <div class="extra-redo" onClick={() => this.haneltabFixed(visible)}>
              <a-icon type={this.visible ? 'unlock' : 'lock'} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
</script>
