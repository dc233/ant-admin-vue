<template>
  <page-view :title="true">
    <div class="table">
      <xkt-table
        :columns="columns"
        :data="data"
        :bordered="borders"
        :pagination="pagination"
        :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        @tableChange="handelPaginationChange"
      >
        <a slot="name" slot-scope="text">{{ text.tableRow.name }}</a>
        <template slot="workId" slot-scope="text">
          {{ text.tableRow.workId }}
        </template>
        <template slot="department" slot-scope="text">
          {{ text.tableRow.department }}
        </template>
        <template slot="operation" slot-scope="text">
          <a-button type="primary" size="small" style="margin-right:4px" @click="handelEdit(text)">
            编辑
          </a-button>
          <a-button type="danger" size="small">
            删除
          </a-button>
        </template>
      </xkt-table>
    </div>
  </page-view>
</template>

<script>
import XktTable from '@/components/Table/Table.vue'
export default {
  components: {
    XktTable
  },
  data() {
    return {
      borders: true,
      pagination: {
        showSizeChanger: true,
        total: 100,
        pageSize: 10,
        current: 1,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total) => `共 ${total} 条`,
        showQuickJumper: true
      },
      selectedRowKeys: [],
      columns: [
        {
          title: '成员姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          width: '20%',
          filterMultiple: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '工号',
          dataIndex: 'workId',
          key: 'workId',
          align: 'center',
          width: '20%',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          key: 'department',
          align: 'center',
          width: '40%',
          scopedSlots: { customRender: 'department' }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [
        {
          key: '1',
          name: '小明',
          workId: '001',
          editable: false,
          department: '行政部'
        },
        {
          key: '2',
          name: '李莉',
          workId: '002',
          editable: false,
          department: 'IT部'
        },
        {
          key: '3',
          name: '王小帅',
          workId: '003',
          editable: false,
          department: '财务部'
        }
      ]
    }
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
    },
    handelPaginationChange(pagination) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
    },
    handelEdit(value) {
      console.log(value)
    }
  }
}
</script>
<style lang="less" scoped>
.table {
  padding: 20px;
  background-color: #fff;
}
</style>
