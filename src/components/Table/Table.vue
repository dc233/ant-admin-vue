<template>
  <a-table
    :columns="columns"
    :dataSource="data"
    :bordered="bordered"
    :pagination="pagination"
    :row-selection="rowSelection"
    :rowKey="rowKey"
    :scroll="scroll"
    @change="handleTableChange"
    :size="size"
  >
    <template v-for="colCustom in columnsCustom" :slot="colCustom.customRender" slot-scope="item, record">
      <slot :name="colCustom.customRender" :tableRow="(item, record)"></slot>
    </template>
  </a-table>
</template>

<script>
export default {
  props: {
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
    return {}
  },
  methods: {
    handleTableChange(pagination) {
      this.$emit('tableChange', pagination)
    }
  }
}
</script>

<style></style>
