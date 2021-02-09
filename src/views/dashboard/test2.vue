<template>
  <div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item ref="name" label="Activity name" prop="name" labelAlign="left">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="Activity zone" prop="region" labelAlign="left">
        <a-select v-model="form.region" placeholder="please select your zone">
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <div class="box">1</div>
    <div class="box">1</div>

    <div class="box">1</div>
    <div class="box">1</div>
    <div class="box">1</div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: 'Please input Activity name', trigger: 'blur' },
          { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        region: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }]
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      verify: false
    }
  },
  methods: {
    submitForm() {
      return this.$refs.ruleForm.validate()
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style>
.box {
  width: 400px;
  height: 400px;
  background-color: pink;
}
</style>
