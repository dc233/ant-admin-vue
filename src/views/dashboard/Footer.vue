<template>
  <div>
    <a-button @click="cancel">{{ cancelText }}</a-button>
    &nbsp;&nbsp;
    <a-button type="primary" @click="ok" :loading="confirmLoading">{{ okText }}</a-button>
  </div>
</template>

<script>
export default {
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    okText: {
      type: String,
      default: '确定'
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    ruleFormobj: {
      type: Object
    }
  },
  name: 'Footer',
  methods: {
    ok() {
      console.log(ruleFormobj)
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>
