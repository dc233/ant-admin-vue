<template>
  <a-card
    style="margin-top: 24px"
    :bordered="false"
    :tabList="tabList"
    :activeTabKey="activeTabKey"
    @tabChange="(key) => onTabChange(key)"
  >
    <template v-for="tab in tabList">
      <xkt-table
        v-if="activeTabKey === tab.key"
        :columns="Columns[tab.tabString]"
        size="middle"
        :data="operation"
        :pagination="pagination[tab.tabString]"
        :key="tab.key"
      />
    </template>
  </a-card>
</template>

<script>
import { task, order, student, startclass, call, client, shipments, operation } from '@/utils/headedata'
export default {
  name: 'infoTab',
  props: {
    id: {
      type: [String, Number]
    },
    tabInfo: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      operation: [],
      tabList: [],
      activeTabKey: '0',
      Columns: {
        task: task,
        order: order,
        class: startclass,
        shipments: shipments,
        call: call,
        student: student,
        operation: operation,
        client: client
      },
      pagination: {
        task: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        order: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        class: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        shipments: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        call: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        student: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        operation: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        },
        client: {
          showSizeChanger: true,
          total: 10,
          pageSize: 10,
          current: 1,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true
        }
      }
    }
  },
  created() {
    let tabString = null
    for (let i in this.tabInfo) {
      switch (this.tabInfo[i]) {
        case '任务信息':
          tabString = 'task'
          break
        case '订单信息':
          tabString = 'order'
          break
        case '开课信息':
          tabString = 'class'
          break
        case '发货信息':
          tabString = 'shipments'
          break
        case '通话记录':
          tabString = 'call'
          break
        case '学生信息':
          tabString = 'student'
          break
        case '操作记录':
          tabString = 'operation'
          break
        case '客户信息':
          tabString = 'client'
          break
      }
      const obj = { key: i, tab: this.tabInfo[i], tabString: tabString }
      this.tabList.push(obj)
    }
  },
  methods: {
    //tab切换
    onTabChange(key) {
      this.activeTabKey = key
    }
  }
}
</script>
