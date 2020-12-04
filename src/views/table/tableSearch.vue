<template>
  <page-view :title="false">
    <div class="table">
      <!-- 查询 -->
      <a-card :bordered="false">
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
      </a-card>

      <!-- 表格数据 -->
      <a-card style="margin-top:20px" :bordered="false">
        <!-- 表格操作 -->

        <a-row>
          <a-col :span="12"></a-col>
          <a-col :span="12">
            <div class="table-operation">
              <a-space>
                <a-button type="primary" size="default" icon="plus" @click="handelAdd" v-action:import>
                  添加成员
                </a-button>
                <a-button type="primary" size="default" @click="importExcel">
                  导入表格
                </a-button>
                <a-button type="primary" size="default" @click="exportTable">
                  导出当前
                </a-button>
                <a-button type="primary" size="default" @click="exportTable">
                  导出所有
                </a-button>
              </a-space>
            </div>
          </a-col>
        </a-row>
        <div>
          <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i class="anticon anticon-info-circle ant-alert-icon"></i>
            已选择
            <a style="font-weight: 600">{{ seletChecknum }}</a>
            项
            <a style="margin-left: 24px" @click="hadelTableChekbox">清空</a>
            <span style="float:right;">
              <a>
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
                  <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
                    <a-row style="width:200px">
                      <vuedraggable v-model="defColumns" animation="300" @update="handelUpdata" class="vuedraggable">
                        <transition-group type="transition" name="flip-list">
                          <a-col span="24" v-for="(item, index) in defColumns" :key="item.key">
                            <template v-if="item.key != 'rowIndex' && item.dataIndex != 'action'">
                              <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
                            </template>
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
        <xkt-table
          :loading="loading"
          :columns="columns"
          :data="data"
          :bordered="borders"
          :pagination="pagination"
          :scroll="{ x: 1500 }"
          :size="size"
          :rowKey="
            (record, index) => {
              return index
            }
          "
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
            <a-button size="small" style="margin-right:4px" @click="handelInfo(tableRow)">
              详情
            </a-button>
            <a-button type="danger" size="small" @click="handelDeletdata">
              删除
            </a-button>
          </template>
        </xkt-table>
      </a-card>
    </div>
    <!-- 编辑修改model -->
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
    <!-- 批量导入excel -->
    <xkt-modal :visible="visible2" title="批量导入客户" okText="提交" @Modecancel="closeClient" @Modelok="handelUpload">
      <template v-slot:customize>
        <excel-import ref="excelImport" :on-success="onSuccess" :on-error="onError">
          <a class="dowland" href="#">下载模板</a>
        </excel-import>
      </template>
    </xkt-modal>
    <!-- 表格导出 -->
    <excel-export :bookType="bookType" :filename="filename" :sheet="sheet" :manual="true" ref="excelExport"></excel-export>
    <table-batch :visible="batchShow">
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">
            <a-icon type="close" />
            批量删除
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="edit" />
            批量处理
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="solution" />
            批量分配
          </a-menu-item>
        </a-menu>
        <a-button type="primary" style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </table-batch>
  </page-view>
</template>

<script>
import Vue from 'vue'
import { getTableList } from '@/api/table.js'
import XktTable from '@/components/Table/Table.vue'
import XktModal from '@/components/modal/modal.vue'
import TableBatch from '@/components/tablebatch'
import moment from 'moment'
import vuedraggable from 'vuedraggable'
export default {
  name: 'TableSearch',
  components: {
    XktTable,
    XktModal,
    TableBatch,
    vuedraggable
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
      columns: [],
      defColumns: [
        {
          title: '序号',
          dataIndex: '',
          key: 'rowIndex',
          customRender: (value, row, index) => `${(this.pagination.current - 1) * 10 + index + 1}`,
          align: 'center',
          width: 100
        },
        {
          title: '成员姓名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '工号',
          dataIndex: 'workId',
          key: 'workId',
          align: 'center',
          width: 100,
          sorter: true,
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          key: 'department',
          align: 'center',
          width: 100,
          scopedSlots: { customRender: 'department' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [],
      loading: true,
      size: 'small',
      visible: false,
      visible2: false,
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
      json: '',
      batchShow: false,
      fileList: [],
      //列设置
      settingColumns: []
    }
  },
  computed: {
    seletChecknum() {
      return this.selectedRowKeys.length
    }
  },
  created() {
    this.handleGetData()
    this.initColumns()
  },
  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      if (this.selectedRowKeys.length === 0) {
        this.batchShow = false
      } else {
        this.batchShow = true
      }
    },
    handelPaginationChange(pagination, sorter) {
      // console.log(sorter)
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
    },
    // 请求表格数据
    handleGetData() {
      getTableList().then((res) => {
        if (res.code === 200) {
          let { infoList } = res.data
          this.data = infoList
          this.pagination.total = infoList.length
          this.loading = false
        } else {
          this.$message.error(res.info)
        }
      })
    },
    // 清除table checkobx 选中的内容
    hadelTableChekbox() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('没有选中的内容')
      } else {
        this.selectedRowKeys = []
        this.batchShow = false
      }
    },
    // 动态改变表格大小样式
    receivesize(val) {
      this.size = val
    },
    // 批量导入表格
    importExcel() {
      this.visible2 = true
    },
    handleChange(info) {
      console.log(info)
    },
    closeClient() {
      this.visible2 = false
      this.$refs.excelImport.clearData()
    },
    handelUpload() {
      if (this.$refs.excelImport.xlsxJson.length === 0) {
        this.$message.error('数据不能为空，请上传文件后再提交')
      } else {
        console.log(this.$refs.excelImport.xlsxJson)
      }
    },
    // 删除表格中的数据
    handelDeletdata() {
      const modal = this.$confirm({
        title: '你确定要删除该条数据',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
          modal.destroy()
        }
      })
    },
    // 跳转详情页
    handelInfo(val) {
      this.$router.push({
        path: '/table/content',
        query: { id: val.workId }
      })
    },
    //列设置更改事件
    onColSettingsChange(checkedValues) {
      var key = this.$route.name + ':colsettings'
      Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
      this.settingColumns = checkedValues
      const cols = this.defColumns.filter((item) => {
        if (item.key == 'rowIndex' || item.dataIndex == 'action') {
          return true
        }
        if (this.settingColumns.includes(item.dataIndex)) {
          return true
        }
        return false
      })
      this.columns = cols
    },
    initColumns() {
      let key = this.$route.name + ':colsettings'
      let colSettings = Vue.ls.get(key)
      if (colSettings == null || colSettings == undefined) {
        let allSettingColumns = []
        this.defColumns.forEach((item, i, array) => {
          allSettingColumns.push(item.dataIndex)
        })
        this.settingColumns = allSettingColumns
        this.columns = this.defColumns
      } else {
        this.settingColumns = colSettings
        const cols = this.defColumns.filter((item) => {
          if (item.key == 'rowIndex' || item.dataIndex == 'action') {
            return true
          }
          if (colSettings.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.columns = cols
      }
    },
    handelUpdata() {
      this.columns = this.defColumns
    },
    handelDrown(val) {
      this.size = val.key
    }
  }
}
</script>
<style lang="less" scoped>
.table-operation {
  padding: 10px 0 20px 0;
  text-align: right;
}
.alert {
  margin: 10px 0;
}
.deletcheck {
  padding: 0 20px;
}
.dowland {
  position: absolute;
  left: 30%;
  top: 20%;
}
.vuedraggable {
  .ant-col {
    font-weight: normal;
    font-size: 14px;
    padding: 2px 0;
    line-height: 22px;
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
