<template>
  <div class="setting-drawer">
    <a-drawer title="主题设置" placement="right" :closable="true" :visible="showLayout" @close="onClose" :maskClosable="false" :handle="handle" width="300">
      <div class="setting-drawer-index-content">
        <!--  侧边栏 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>
          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip>
              <template slot="title">
                暗色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('dark')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" alt="dark" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme === 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
            <a-tooltip>
              <template slot="title">
                亮色菜单风格
              </template>
              <div class="setting-drawer-index-item" @click="handleMenuTheme('light')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" alt="light" />
                <div class="setting-drawer-index-selectIcon" v-if="navTheme !== 'dark'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
        </div>
        <!-- 主题色 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>

          <div style="height: 20px">
            <a-tooltip class="setting-drawer-theme-color-colorBlock" v-for="(item, index) in colorList" :key="index">
              <template slot="title">
                {{ item.key }}
              </template>
              <a-tag :color="item.color" @click="changeColor(item.color)">
                <a-icon type="check" v-if="item.color === primaryColor"></a-icon>
              </a-tag>
            </a-tooltip>
          </div>
        </div>
        <!-- 导航模式 -->
        <a-divider />
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>
          <div class="setting-drawer-index-blockChecbox">
            <a-tooltip title="侧边栏导航">
              <div class="setting-drawer-index-item" @click="handleLayout('sidemenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg" alt="sidemenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode === 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>

            <a-tooltip title="顶部栏导航">
              <div class="setting-drawer-index-item" @click="handleLayout('topmenu')">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg" alt="topmenu" />
                <div class="setting-drawer-index-selectIcon" v-if="layoutMode !== 'sidemenu'">
                  <a-icon type="check" />
                </div>
              </div>
            </a-tooltip>
          </div>
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <a-list-item>
                <a-tooltip slot="actions">
                  <template slot="title">
                    该设定仅 [顶部栏导航] 时有效
                  </template>
                  <a-select size="small" style="width: 80px;" :defaultValue="contentWidth" @change="handleContentWidthChange">
                    <a-select-option value="Fixed">固定</a-select-option>
                    <a-select-option value="Fluid" v-if="layoutMode !== 'sidemenu'">流式</a-select-option>
                  </a-select>
                </a-tooltip>
                <a-list-item-meta>
                  <div slot="title">内容区域宽度</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="fixedHeader" @change="handleFixedHeader" />
                <a-list-item-meta>
                  <div slot="title">固定 Header</div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" size="small" :disabled="layoutMode === 'topmenu'" :defaultChecked="fixSiderbar" @change="handleFixSiderbar" />
                <a-list-item-meta>
                  <div
                    slot="title"
                    :style="{
                      textDecoration: layoutMode === 'topmenu' ? 'line-through' : 'unset'
                    }"
                  >
                    固定侧边菜单
                  </div>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-switch slot="actions" size="small" :defaultChecked="multiTab" @change="onMultiTab" />
                <a-list-item-meta>
                  <div slot="title">多页签模式</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import config from '@/config/defaultSettings'
import { updateTheme, updateColorWeak, colorList } from './settingConfig'
import { mixin, mixinDevice } from '@/utils/mixin'
export default {
  mixins: [mixin, mixinDevice],
  data() {
    return {
      colorList,
      visible: false,
      handle: <div />
    }
  },
  mounted() {
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
    // this.onMultiTab(true)
  },
  methods: {
    toggle() {
      this.visible = !this.visible
      if (this.visible) {
        document.querySelector('.setting-drawer-index-handle').setAttribute('style', 'right:300px')
      } else {
        document.querySelector('.setting-drawer-index-handle').setAttribute('style', 'right:0')
      }
    },
    afterVisibleChange() {
      //   this.syncVisible = true;
    },
    onClose() {
      this.$store.dispatch('showLayout', false)
    },
    handleMenuTheme(theme) {
      var logo = document.querySelector('.logo')
      logo.setAttribute('data-theme', theme)
      this.$store.dispatch('ToggleTheme', theme)
    },
    changeColor(color) {
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color)
        updateTheme(color)
      }
    },
    handleLayout(mode) {
      if (this.layoutMode === 'topmenu') {
        this.$store.dispatch('ToggleLayoutMode', mode)
        // 因为顶部菜单不能固定左侧菜单栏，所以强制关闭
        this.$store.dispatch('ToggleFixSiderbar', true)
      } else {
        this.$store.dispatch('ToggleLayoutMode', mode)
        this.handleFixSiderbar(false)
      }
    },
    handleFixSiderbar(fixed) {
      if (this.layoutMode === 'topmenu') {
        this.$store.dispatch('ToggleFixSiderbar', false)
        return
      }
      this.$store.dispatch('ToggleFixSiderbar', fixed)
    },
    handleContentWidthChange(type) {
      this.$store.dispatch('ToggleContentWidth', type)
    },
    handleFixedHeader(fixed) {
      this.$store.dispatch('ToggleFixedHeader', fixed)
    },
    onMultiTab(checked) {
      this.$store.dispatch('ToggleMultiTab', checked)
    }
  }
}
</script>

<style lang="less">
.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;
    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;
      img {
        width: 48px;
      }
      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;
    i {
      font-size: 14px;
    }
  }
}
.setting-drawer-index-handle {
  position: fixed;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;
  transition: right 0.3s;
  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>
