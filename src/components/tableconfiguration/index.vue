<template>
  <div>
    <a-space>
      <a-tooltip>
        <template slot="title">
          密度
        </template>
        <a-dropdown :trigger="['click']">
          <a-icon type="column-height" class="table-icon" />
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
      </a-tooltip>
      <!-- 列设置 -->
      <a-tooltip>
        <template slot="title">
          列设置
        </template>
        <a-dropdown :trigger="['click']" v-model="visible">
          <a-icon type="setting" class="table-icon" />
          <a-menu slot="overlay" @click="handleMenuClick" class="t-menu">
            <a-menu-item class="table-menu">
              列展示

              <a-button type="link" @click="handelrecovery">重置</a-button>
            </a-menu-item>
            <a-menu-divider />
            <vuedraggable v-model="arr" animation="300" filter=".forbid" @update="handelUpdata" class="vuedraggable">
              <a-menu-item :class="item.title === '操作' ? 'forbid' : ''" class="table-copymenu" v-for="(item, index) in arr" :key="item.title">
                <span class="move">
                  <a-icon type="more" />
                </span>
                <a class="columns-title">{{ item.title }}</a>
                <span class="move-config">
                  <a-space>
                    <a-tooltip>
                      <template slot="title">
                        固定在列首
                      </template>
                      <a-icon @click="hadelTableTop(item.title)" class="table-size" type="vertical-align-top" />
                    </a-tooltip>
                    <a-tooltip>
                      <template slot="title">
                        固定在列尾
                      </template>
                      <a-icon @click="handelTableBottom(item.title)" class="table-size" type="vertical-align-bottom" />
                    </a-tooltip>
                  </a-space>
                </span>
              </a-menu-item>
            </vuedraggable>
          </a-menu>
        </a-dropdown>
      </a-tooltip>
    </a-space>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
export default {
  props: {
    columns: {
      type: Array
    }
  },
  components: {
    vuedraggable
  },
  computed: {
    plainOptions() {
      let list = []
      for (let i = 0; i < this.arr.length; i++) {
        list.push(this.arr[i]['title'])
      }
      return list
    }
  },
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      visible: false,
      recovery: this.columns,
      arr: this.columns
    }
  },
  methods: {
    handelDrown(val) {
      this.$emit('Tablesize', val.key)
    },
    onCheckAllChange(e) {
      console.log(e)
    },
    handleMenuClick(e) {},
    handelUpdata() {
      this.$emit('update:columns', this.arr)
    },
    // 重置
    handelrecovery() {
      this.arr = this.recovery
      this.handelUpdata()
    },
    // 固定列首
    hadelTableTop(val) {
      let tem, index
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i]['title'] === val) {
          tem = this.arr[i]
          index = i
        }
      }
      this.arr.splice(index, 1)
      this.arr.unshift(tem)
    },
    // 固定在列尾
    handelTableBottom(val) {
      let tem, index
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i]['title'] === val) {
          tem = this.arr[i]
          index = i
        }
      }
      this.arr.splice(index, 1)
      this.arr.push(tem)
    }
  }
}
</script>

<style lang="less" scoped>
.table-icon {
  font-size: 22px;
  cursor: pointer;
}
.table-menu {
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-copymenu {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
}
.table-copymenu:hover .move-config {
  display: block;
}
.columns-title {
  padding: 0 10px;
}
.t-menu {
  height: 400px;
  overflow: auto;
}
.t-menu::-webkit-scrollbar {
  width: 4px;
}
.t-menu::-webkit-scrollbar-thumb {
  background-color: #ddd;
}
.t-menu::-webkit-scrollbar-track {
  background-color: transparent;
}
.move {
  cursor: move;
}
.move-config {
  display: none;
  width: 100px;
  cursor: pointer;
  text-align: right;
}
.table-size {
  font-size: 16px;
}
.vuedraggable {
  li {
    clear: both;
    margin: 0;
    padding: 5px 12px;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: #e6f7ff;
    }
  }
}
</style>
