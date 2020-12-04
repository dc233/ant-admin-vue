<template>
  <div>
    <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
      <i class="anticon anticon-info-circle ant-alert-icon"></i>
      已选择
      <a style="font-weight: 600">{{ seletChecknum }}</a>
      项
      <a style="margin-left: 24px" @click="hadelTableChekbox">清空</a>
      <span style="float:right;">
        <a @click="refresh">
          <a-icon type="sync" />
          刷新
        </a>
        <a-divider type="vertical" />
        <a-dropdown :trigger="['click']">
          <a>
            <a-icon type="column-height" />
            密度
          </a>
          <a-menu slot="overlay" @click="handelDrown">
            <a-menu-item key="default">
              <a>默认</a>
            </a-menu-item>
            <a-menu-item key="middle">
              <a>中等</a>
            </a-menu-item>
            <a-menu-item key="small">
              <a>紧凑</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-divider type="vertical" />
        <a-popover title="自定义列" trigger="click" placement="leftBottom">
          <template slot="content">
            <a-checkbox-group @change="onColSettingsChange" :defaultValue="settingColumns">
              <a-row style="width:200px">
                <vuedraggable v-model="defColumns" animation="300" @update="handelUpdata" class="vuedraggable">
                  <transition-group type="transition" name="flip-list">
                    <a-col span="24" v-for="(item, index) in defColumns" :key="item.key">
                      <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                    </a-col>
                  </transition-group>
                </vuedraggable>
              </a-row>
            </a-checkbox-group>
          </template>
          <a>
            <a-icon type="setting" />
            设置
          </a>
        </a-popover>
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vuedraggable from 'vuedraggable'
export default {
  props: {
    // 表格选中的数据总数
    seletChecknum: {
      type: Number,
      required: true
    },
    // 自定义列的参数
    settingColumns: {
      type: Array,
      required: true
    },
    // 默认的列配置
    defColumns: {
      type: Array,
      required: true
    },
    // 动态列
    columns: {
      type: Array,
      required: true
    }
  },
  components: {
    vuedraggable
  },
  data() {
    return {}
  },
  created() {
    this.initColumns()
  },
  methods: {
    // 清空选中的表格总数
    hadelTableChekbox() {
      this.$emit('cleardata', [])
    },
    // 刷新表格数据
    refresh() {
      this.$emit('refreshdata')
    },
    // 表格密度大小设置
    handelDrown(val) {
      this.$emit('tablesize', val.key)
    },
    // 列设置更改事件
    onColSettingsChange(checkedValues) {
      console.log(checkedValues)
      let key = this.$route.name + ':colsettings'
      Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
      this.$emit('update:settingColumns', checkedValues)
      const cols = this.defColumns.filter((item) => {
        if (item.key == 'rowIndex' || item.dataIndex == 'action') {
          return true
        }
        if (this.settingColumns.includes(item.dataIndex)) {
          return true
        }
        return false
      })
      this.$emit('update:columns', cols)
    },
    // 初始化列
    initColumns() {
      let key = this.$route.name + ':colsettings'
      let colSettings = Vue.ls.get(key)
      if (colSettings == null || colSettings == undefined) {
        let allSettingColumns = []
        this.defColumns.forEach((item, i, array) => {
          allSettingColumns.push(item.dataIndex)
        })
        this.$emit('update:settingColumns', allSettingColumns)
        this.$emit('update:columns', this.defColumns)
      } else {
        this.$emit('update:settingColumns', colSettings)
        const cols = this.defColumns.filter((item) => {
          if (item.key == 'rowIndex' || item.dataIndex == 'action') {
            return true
          }
          if (colSettings.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.$emit('update:columns', cols)
      }
    },
    handelUpdata() {
      this.$emit('update:columns', this.defColumns)
    }
  }
}
</script>
<style lang="less" scoped>
.vuedraggable {
  .ant-col {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    padding: 2px 0;
    white-space: nowrap;
    cursor: move;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      color: #fff;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
