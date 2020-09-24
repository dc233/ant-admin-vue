<template>
  <page-view :title="false">
    <div class="table">
      <!-- 查询 -->
      <div class="table-page-search-wrapper">
        <a-form-model ref="reform" :model="form" :label-col="labelCol2" :wrapper-col="wrapperCol2">
          <a-row class="form-row" :gutter="16">
            <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
              <a-form-model-item label="成员姓名" labelAlign="left">
                <a-input placeholder="成员姓名" v-model="form.name" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
              <a-form-model-item label="工号" labelAlign="left">
                <a-input placeholder="请输入" v-model="form.url" />
              </a-form-model-item>
            </a-col>
            <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
              <a-form-model-item label="所属部门" labelAlign="left">
                <a-select v-model="form.username" placeholder="请选择所属部门">
                  <a-select-option value="行政部">
                    行政部
                  </a-select-option>
                  <a-select-option value="IT部">
                    IT部
                  </a-select-option>
                  <a-select-option value="财务部">
                    财务部
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <template v-if="advanced">
              <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
                <a-form-model-item label="审批人" labelAlign="left">
                  <a-select v-model="form.Approver" placeholder="请选择审批人">
                    <a-select-option value="0">
                      王同学
                    </a-select-option>
                    <a-select-option value="1">
                      李同学
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
                <a-form-model-item label="生效日期" labelAlign="left">
                  <a-range-picker
                    format="YYYY-MM-DD HH:mm:ss"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :defaultValue="[moment(getTodyStady(), dateFormat), moment(getTodyEnd(), dateFormat)]"
                    @change="handelChange"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
                <a-form-model-item label="编号" labelAlign="left">
                  <a-input placeholder="请输入编号" v-model="form.regist" />
                </a-form-model-item>
              </a-col>
              <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
                <a-form-model-item label="有效时间" labelAlign="left">
                  <a-range-picker
                    style="width:100%"
                    v-model="form.deatime2"
                    format="YYYY-MM-DD HH:mm:ss"
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    :show-time="{
                      hideDisabledOptions: false,
                      defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
                    }"
                    :disabledDate="disabledDate"
                    :ranges="{ 今天: [moment(), moment()], 本月: [moment(), moment().endOf('month')] }"
                  >
                    <a-icon slot="suffixIcon" type="calendar" />
                  </a-range-picker>
                </a-form-model-item>
              </a-col>
              <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
                <a-form-model-item label="管理人" labelAlign="left">
                  <a-select v-model="form.administrator" placeholder="请选择管理人">
                    <a-select-option value="0">
                      王同学
                    </a-select-option>
                    <a-select-option value="1">
                      李同学
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </template>
            <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
              <a-form-model-item>
                <span class="table-page-search-submitButtons" :style="(advanced && { float: 'left', overflow: 'hidden' }) || {}">
                  <a-button type="primary">查询</a-button>
                  <a-button style="margin-left: 8px">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'" />
                  </a>
                </span>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <!-- 表格操作 -->
      <div class="table-operation">
        <a-space>
          <a-button type="primary" size="default" icon="plus" @click="handelAdd">
            添加成员
          </a-button>
          <excel-import :on-success="onSuccess" :on-error="onError">
            <a-button type="primary" size="default">
              导入表格
            </a-button>
          </excel-import>
          <a-button type="primary" size="default" @click="exportTable">
            导出当前
          </a-button>
          <a-button type="primary" size="default" @click="exportTable">
            导出所有
          </a-button>
        </a-space>
      </div>
      <!-- 表格数据 -->
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
        // 用v-slot插槽 解构对象的值
        <template v-slot:operation="{ tableRow }">
          <a-button type="primary" size="small" style="margin-right:4px" @click="handelEdit(tableRow)">
            编辑
          </a-button>
          <a-button type="danger" size="small">
            删除
          </a-button>
        </template>
      </xkt-table>
    </div>

    <xkt-modal :visible="visible" :title="title" :data="modaldata" :width="width" @Modelok="handelDetermine" @Modecancel="handelParntcancel">
      <template v-slot="{ data }">
        <a-form-model ref="ruleFrom" :model="data" :wrapper-col="wrapperCol" :label-col="labelCol">
          <a-form-model-item label="成员姓名" labelAlign="left">
            <a-input v-model="data.name" placeholder="请输入成员姓名"></a-input>
          </a-form-model-item>
          <a-form-model-item label="工号" labelAlign="left">
            <a-input v-model="data.workId" placeholder="请输入工号"></a-input>
          </a-form-model-item>
          <a-form-model-item label="所属部门" labelAlign="left">
            <a-select v-model="data.department" placeholder="请选择部门">
              <a-select-option key="行政部">行政部</a-select-option>
              <a-select-option key="IT部">IT部</a-select-option>
              <a-select-option key="财务部">财务部</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </template>
    </xkt-modal>
    <!-- 表格导出 -->
    <excel-export :bookType="bookType" :filename="filename" :sheet="sheet" :manual="true" ref="excelExport"></excel-export>
  </page-view>
</template>

<script>
import XktTable from '@/components/Table/Table.vue'
import XktModal from '@/components/modal/modal.vue'
import moment from 'moment'
export default {
  components: {
    XktTable,
    XktModal
  },
  data() {
    return {
      labelCol2: { span: 5 },
      wrapperCol2: { span: 19 },
      form: {
        name: '',
        url: '',
        username: undefined,
        Approver: undefined,
        administrator: undefined,
        deatime: [],
        regist: '',
        deatime2: []
      },
      dateFormat: 'YYYY-MM-DD HH:mm:ss',
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
          filterMultiple: true,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '工号',
          dataIndex: 'workId',
          key: 'workId',
          align: 'center',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          key: 'department',
          align: 'center',
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
          department: '行政部',
          num: 123
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
      ],
      visible: false,
      title: '添加',
      modaldata: {},
      width: 600,
      wrapperCol: { span: 20 },
      labelCol: { span: 4 },
      advanced: false,
      // 导出表格
      bookType: 'xlsx',
      filename: '岗位表格',
      sheet: [
        {
          title: '人员表格',
          tHeader: ['成员姓名', '工号', '所属部门'],
          table: [''],
          keys: ['name', 'workId', 'department'],
          sheetName: '',
          cellStyle: [
            {
              cell: 'A1',
              font: {
                sz: 14,
                color: { rgb: 'ffffff' },
                bold: true
              },
              fill: {
                fgColor: { rgb: 'ff7e00' }
              }
            }
          ]
        }
      ],
      json: ''
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
      this.visible = true
      this.modaldata = value
      this.title = '编辑'
    },

    // modal
    handelDetermine(val) {
      if (this.title === '编辑') {
        this.visible = false
        this.modaldata = {}
        // 修改接口
        this.$message.success('修改成功')
      } else {
        const obj = Object.assign({ key: '4', editable: false }, val)
        this.data.push(obj)
        this.$message.success('新增成功')
        this.visible = false
        this.modaldata = {}
      }
    },
    handelParntcancel(val) {
      this.visible = false
      this.modaldata = {}
    },
    moment,
    getTodyStady() {
      return moment().format('YYYY-MM-DD 00:00:00')
    },
    getTodyEnd() {
      return moment().format('YYYY-MM-DD 23:59:59')
    },
    handelChange([string, date]) {
      this.form.deatime = [string, date]
    },
    disabledDate(current) {
      return current && current > moment().endOf('day') // 当天之前的不可选，包括当天
      // return current < moment().subtract(29, 'days') || current > moment();  //   当天之前30天内可选。其他不可选  当天也可选
      // return current < moment().subtract(30, 'day') || current &&current.endOf('day') > moment();      // 当天之前30天可选，其他不可选，当天也不能选
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    handelAdd() {
      this.visible = true
      this.title = '新增成员'
    },
    // 导出表格
    exportTable() {
      if (this.data.length === 0) {
        this.$message.warning('表格数据为空，请先查询后在导出')
        return
      }
      let time = moment(new Date())
        .add(0, 'year')
        .format('YYYYMMDD')
      this.filename = `岗位表格${time}`
      this.sheet.forEach((item) => {
        item.table = this.data
      })
      this.$refs.excelExport.pikaExportExcel()
    },
    // 导入表格
    onSuccess(response, file) {
      console.log(response, file)
    },
    // 导入表格错误
    onError(err, file) {
      this.$message.error(err)
    }
  }
}
</script>
<style lang="less" scoped>
.table {
  padding: 20px;
  background-color: #fff;
}
.table-operation {
  padding: 20px 0;
}
</style>
