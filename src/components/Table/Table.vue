<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :dataSource="data"
    :bordered="bordered"
    :pagination="pagination"
    :row-selection="rowSelection"
    :rowKey="rowKey"
    :scroll="scroll"
    :components="components"
    @change="handleTableChange"
    :size="size"
  >
    <template v-for="colCustom in columnsCustom" :slot="colCustom.customRender" slot-scope="item, record">
      <slot :name="colCustom.customRender" :tableRow="(item, record)"></slot>
    </template>
  </a-table>
</template>

<script>
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // 表头
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    // 表格数据
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    // 是否展示外边框和列边框
    bordered: {
      type: Boolean,
      default: false
    },
    // 指定树形结构的列名
    childrenColumnName: {
      type: [String, Array]
    },
    // 初始时，是否展开所有行
    defaultExpandAllRows: {
      type: Boolean,
      default: false
    },
    // 分页器
    pagination: {
      type: [Object, Boolean]
    },
    // 列表项是否可选择   配置项的选择见官网  table API下的 rowSelection
    rowSelection: {
      type: Object
    },
    // 表格行 key 的取值，可以是字符串或一个函数
    rowKey: {
      type: [String, Function]
    },
    // scroll设置横向或纵向滚动，也可用于指定滚动区域的宽和高
    scroll: {
      type: Object
    },
    // 表格大小
    size: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    columnsCustom() {
      return this.columns
        .filter((item) => {
          return item.scopedSlots
        })
        .map((item) => item.scopedSlots)
    }
  },
  data() {
    this.components = {
      header: {
        cell: (h, props, children) => {
          const { key, ...restProps } = props
          const col = this.columns.find((col) => {
            const k = col.dataIndex || col.key
            return k === key
          })

          if (!col || !col.width) {
            return h('th', { ...restProps }, [...children])
          }

          const dragProps = {
            key: col.dataIndex || col.key,
            class: 'table-draggable-handle',
            attrs: {
              w: 10,
              x: col.width,
              z: 1,
              axis: 'x',
              draggable: true,
              resizable: false
            },
            on: {
              dragging: (x, y) => {
                col.width = Math.max(x, 1)
              }
            }
          }
          const drag = h('vue-draggable-resizable', { ...dragProps })
          return h('th', { ...restProps, class: 'resize-table-th' }, [...children, drag])
        }
      }
    }
    return {}
  },
  methods: {
    handleTableChange(pagination, filters, { field, order }) {
      console.log(field, order)
      this.$emit('tableChange', pagination)
    }
  }
}
</script>

<style lang="less">
.resize-table-th {
  position: relative;
}
.table-draggable-handle {
  /* width: 10px !important; */
  height: 100% !important;
  left: auto !important;
  right: -5px;
  cursor: col-resize;
  touch-action: none;
  border: none;
}
</style>
