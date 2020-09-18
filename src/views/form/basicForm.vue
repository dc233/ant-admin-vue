<template>
  <!-- 表单组件在 v-modle 基础上增加 rules的校验规则 -->
  <page-view :title="false">
    <div slot="headerContent">
      <div class="title">
        基础表单
      </div>
      <p>
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
      </p>
    </div>
    <div class="formode">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol" style="width:500px">
        <a-form-model-item ref="name" label="姓名" prop="name">
          <a-input
            placeholder="请填写姓名"
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur()
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item label="地区" prop="region">
          <a-select :allowClear="true" placeholder="请填写地区" v-model="form.region">
            <a-select-option value="beijing">
              北京
            </a-select-option>
            <a-select-option value="shanghai">
              上海
            </a-select-option>
            <a-select-option value="guangzhou">
              广州
            </a-select-option>
            <a-select-option value="shenzheng">
              深圳
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="时间" required prop="date1">
          <a-date-picker v-model="form.date1" show-time type="date" placeholder="请填写日期" style="width: 100%;" />
        </a-form-model-item>
        <a-form-model-item label="Instant delivery" prop="delivery">
          <a-switch v-model="form.delivery" />
        </a-form-model-item>
        <a-form-model-item label="后端框架" prop="type">
          <a-checkbox-group v-model="form.type">
            <a-checkbox value="1" name="type">
              PHP
            </a-checkbox>
            <a-checkbox value="2" name="type">
              Go
            </a-checkbox>
            <a-checkbox value="3" name="type">
              Python
            </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item label="前端框架" prop="resource">
          <a-radio-group v-model="form.resource">
            <a-radio value="1">
              Vue
            </a-radio>
            <a-radio value="2">
              React
            </a-radio>
            <a-radio value="3">
              Angular
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="留言给我们" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">
            确定
          </a-button>
          <a-button style="margin-left: 10px;" @click="resetForm">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </page-view>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: '',
        region: 'beijing',
        date1: null,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ],
        region: [
          {
            required: true,
            message: '请填写地区',
            trigger: 'change'
          }
        ],
        date1: [{ required: true, message: 'Please pick a date', trigger: 'change' }],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change'
          }
        ],
        resource: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change'
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.$refs.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style lang="less">
.formode {
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 20px;
}
</style>
