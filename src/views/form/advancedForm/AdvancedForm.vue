<template>
  <page-view :title="true">
    <div slot="headerContent">
      <p>
        高级表单常见于一次性输入和提交大批量数据的场景
      </p>
    </div>
    <a-card class="card" title="仓库管理" :bordered="false">
      <repository-form ref="repository" />
    </a-card>
    <a-card class="card" title="任务管理" :bordered="false">
      <task-form ref="task" :showSubmit="false" />
    </a-card>

    <!-- table -->
    <a-card class="card" title="成员列表" :bordered="false">
      <a-table :columns="columns" :dataSource="data" :pagination="false" :loading="memberLoading">
        <!-- 插槽语法 -->
        <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="(e) => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 操作 -->
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增成员</a-button>
    </a-card>
    <footer-tool-bar>
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </page-view>
</template>

<script>
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterTollBar'
export default {
  components: {
    RepositoryForm,
    TaskForm,
    FooterToolBar
  },
  data() {
    return {
      memberLoading: false,
      loading: false,
      columns: [
        {
          title: '成员姓名',
          dataIndex: 'name',
          align: 'center',
          key: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '工号',
          dataIndex: 'workId',
          align: 'center',
          key: 'workId',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          align: 'center',
          key: 'department',
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
    newMember() {
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true,
        isNew: true
      })
    },
    // 添加
    saveRow(record) {
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) {
        this.memberLoading = false
        this.$message.error('请填写完整信息')
      }

      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.find((item) => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    // 删除
    remove(key) {
      const newData = this.data.filter((item) => item.key !== key)
      this.data = newData
    },
    // 编辑
    toggle(key) {
      const target = this.data.find((item) => item.key === key)
      target._originalData = { ...target }
      target.editable = !target.editable
    },
    // 取消
    cancel(key) {
      const target = this.data.find((item) => item.key === key)
      Object.keys(target).forEach((key) => {
        target[key] = target._originalData[key]
      })
      target._originalData = undefined
    },
    handleChange(val, key, column) {
      const newData = [...this.data]
      const target = newData.find((item) => key === item.key)
      if (target) {
        target[column] = val
        this.data = newData
      }
    },
    validate() {
      const {
        $refs: { repository, task }
      } = this
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 24px;
}
</style>
