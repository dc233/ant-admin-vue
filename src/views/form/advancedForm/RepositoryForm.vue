<template>
  <a-form-model ref="reform" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-row class="form-row" :gutter="16">
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="仓库名" prop="name" labelAlign="left">
          <a-input placeholder="仓库名称" v-model="form.name" />
        </a-form-model-item>
      </a-col>
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="仓库域名" prop="url">
          <a-input addonBefore="http://" addonAfter=".com" placeholder="请输入" v-model="form.url" />
        </a-form-model-item>
      </a-col>
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="仓库管理员" prop="username">
          <a-select v-model="form.username" placeholder="请选择管理员">
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
        <a-form-model-item label="审批人" prop="Approver">
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
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="生效日期" prop="deatime" labelAlign="left">
          <a-range-picker
            format="YYYY-MM-DD HH:mm:ss"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            :defaultValue="[moment(getTodyStady(), dateFormat), moment(getTodyEnd(), dateFormat)]"
            @change="handelChange"
          />
        </a-form-model-item>
      </a-col>
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="城市地址" prop="regist" labelAlign="right">
          <a-input placeholder="请输入地址" v-model="form.regist" />
        </a-form-model-item>
      </a-col>
      <a-col :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 6 }">
        <a-form-model-item label="有效时间" prop="deatime2">
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
        <a-form-model-item label="管理人" prop="administrator">
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
    </a-row>
  </a-form-model>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
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
      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
          { min: 3, max: 5, message: '输入3到5个字', trigger: 'blur' }
        ],
        url: [{ required: true, message: '请输入仓库域名', trigger: 'blur' }],
        username: [{ required: true, message: '请选择管理员', trigger: 'change' }],
        Approver: [{ required: true, message: '请选择审批人', trigger: 'change' }],
        deatime: [{ required: true, message: '请选择时间', trigger: 'change' }],
        deatime2: [{ required: true, message: '请选择时间', trigger: 'change' }],
        regist: [{ required: true, message: '请输入城市地址', trigger: 'blur' }],
        administrator: [{ required: true, message: '请选择管理人', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleSubmit() {
      return new Promise((reslove, reject) => {
        this.$refs.reform.validate((vlaue) => {
          if (vlaue) {
            reslove(this.form)
          } else {
            reject('error from')
            console.log(this.$refs.reform)
            return false
          }
        })
      })
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
    }
  }
}
</script>
